export async function onRequestPost(context) {
  try {
    const { keyword } = await context.request.json();
    
    if (!keyword) {
      return new Response(JSON.stringify({ error: 'keyword is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch('http://apis.5118.com/keyword/word/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '6F8B73B6828F4F94B7E34703105F20EA'
      },
      body: JSON.stringify({ keyword: keyword })
    });

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
