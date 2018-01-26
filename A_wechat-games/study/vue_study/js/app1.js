var list = [

	/*{
		title:"吃饭睡觉打豆豆"
	},
	{
		title:"吃饭睡觉打豆豆"
	}*/
];
new Vue({
	el:".main",
	data:{
		list:list,
		todo:""
	},
	methods:{
		addTodo(ev){   //添加任务  这个写法 是 es6提供的   可以不写 function
			// 向 list中　添加　一项任务
			
			/*
			 
			 * */
			// 事件处理行数中的  this 指向的是 根实例  new Vue
			//if(ev.keyCode === 13){
				console.log("我触发了");
				this.list.push({
					//title:ev.target.value
					title:this.todo
				});
				this.todo = '';
			//}
		}
	}
});
