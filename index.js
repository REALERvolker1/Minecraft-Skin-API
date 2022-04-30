import koa from 'koa'
import Router from '@koa/router'

const app = new koa()
const router = new Router()
const port = 3000
app.use(router.routes()).use(router.allowedMethods())
app.listen(port)
console.log(`Serving on port ${port}`)
router.get('/',async(ctx)=>{
	let mc = await fetch(`https://api.mojang.com/users/profiles/minecraft/${ctx.request.query["skin"]}`)
	.then(res => {
	return(res.json())
	})
	.then(res => {
		let uuid = res.id
		if (uuid){
			if (ctx.request.query["json"] == "true"){
			ctx.body = `{"name":"${ctx.request.query["skin"]}","url":"https://visage.surgeplay.com/full/512/${uuid}.png"}`
			}
			else{
				ctx.body = `<img src="https://visage.surgeplay.com/full/512/${uuid}.png"/>`
			}
		}
	})
	.catch(err => console.error(err))
})
