const buttons = document.querySelectorAll('button')
const img = document.querySelector('img')
const div = document.getElementById('description')

buttons.forEach((button)=>{
  button.addEventListener('click', ()=>{
    img.src = `https://http.cat/${button.id}`
    div.innerHTML = ""
    const req = new Request(`http://127.0.0.1:7777/${button.id}`)
    fetch(req)
        .then((res)=>res.text())
        .then((text)=>{
            div.innerText = text
        })
        .catch((e)=>
            div.innerText = e
        )
  })
})