<script>
  let error
  async function login (e) {
    e.preventDefault()
    const url = `https://api.instagram.com/oauth/authorize?client_id=${process.env.APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user_profile,user_media&response_type=code`
    try {
      // const res = await fetch(url, {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      // if (!res.ok) {
      //   error = JSON.stringify(res, null, 2)
      // }
      window.open(url)
    } catch (e) {
      error = JSON.stringify(e, null, 2)
    }
  }
</script>
<button on:click={login}>Login</button>
<pre>{error}</pre>