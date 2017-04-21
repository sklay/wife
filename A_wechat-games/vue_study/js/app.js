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
		todo:"",
		edtorTodos:"",//记录 正在 编辑的数据
		beforeTitle:""//记录正在编辑的这天任务的 title
	},
	computed:{
		noCheckeLength:function(){
			return this.list.filter(function(item){
				return  !item.isChecked
			}).length
		}
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
		},
		edtorTodo(todo){//编辑任务
			console.log(todo);
			//编辑任务的时候，记录 下编辑这条任务的 title,方便取消的时候 重给之前的值
			this.beforeTitle = todo.title;
			
			this.edtorTodos = todo;
		},
		edtorTodoed(todo){//编辑任务
			this.edtorTodos = "";
		},
		cancleTodo(todo){//取消编辑
			todo.title = this.beforeTitle;
			//让 div显示出来，让 input影藏
			this.edtorTodos="";
			
		}
	},
	
	directives:{//自定义属性  自动获取 input的 焦点
		"focus":{
			update(el,binding){//钩子函数      el是指令绑定的 元素   update是一个 钩子函数
				console.log("el是 ======",el);
				console.log("binding=====",binding);  //里面有个值 value  看这个 值  是为 true  还是 foucs
				
				
				if(binding.value){
					el.focus();
				}
			}
		}
	}
});
