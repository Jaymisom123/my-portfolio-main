// API route para obter a imagem de pré-visualização de um site.
// Tenta usar og:image ou twitter:image do HTML; se não existir, usa screenshot do site.

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      res.status(400).json({ error: 'Parâmetro "url" é obrigatório.' });
      return;
    }

    const targetUrl = decodeURIComponent(url);

    // 1) Busca o HTML do site para extrair og:image / twitter:image
    const htmlResponse = await fetch(targetUrl, {
      // Evita redirecionamentos infinitos
      redirect: 'follow',
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    // Se o site não responder HTML, vai direto para o fallback de screenshot
    let imageUrl = null;

    if (htmlResponse.ok) {
      const html = await htmlResponse.text();

      // Regex simples para capturar og:image e twitter:image
      const ogMatch = html.match(
        /<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["'][^>]*>/i
      );
      const twMatch = html.match(
        /<meta\s+(?:property|name)=["']twitter:image(?:[:\w-]*)?["']\s+content=["']([^"']+)["'][^>]*>/i
      );

      const raw = (ogMatch && ogMatch[1]) || (twMatch && twMatch[1]) || null;
      if (raw) {
        try {
          imageUrl = new URL(raw, targetUrl).toString();
        } catch {
          imageUrl = raw;
        }
      }
    }

    // 2) Fallback: usa serviço de screenshot se não achou imagem
    if (!imageUrl) {
      // thum.io: gera screenshot rápido; parâmetros para largura/recorte
      imageUrl = `https://image.thum.io/get/width/1200/crop/675/noanimate/${encodeURIComponent(
        targetUrl
      )}`;
    }

    // 3) Faz proxy da imagem para contornar CORS e funcionar com next/image
    const imgResponse = await fetch(imageUrl, { redirect: 'follow' });
    if (!imgResponse.ok) {
      res.status(502).json({ error: 'Falha ao obter a imagem de preview.' });
      return;
    }

    const contentType = imgResponse.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await imgResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', contentType);
    // Cache em edge/CDN por 1 dia
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    res.status(200).send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno ao gerar a imagem.' });
  }
}


