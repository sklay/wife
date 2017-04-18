var list = [

	{
		title:"吃饭睡觉打豆豆",
		isChecked:false
	},
	{
		title:"吃饭睡觉打豆豆",
		isChecked:true
	}
];
new Vue({
	el:".main",
	data:{
		list:list,
		todo:""
	},
	methods:{
		//addTodo(data,ev){ 
		addTodo(){ //添加任务
			this.list.push({
				title:this.todo,
				isChecked:false
			});
			this.todo = '';
		},
		deleteTodo(todo){//删除任务
			var index = this.list.indexOf(todo);
			this.list.splice(index,1)
		}
	}
});
