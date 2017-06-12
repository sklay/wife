//2017.6.12 新加功能

//存储localStorage里的数据
var store = {
	save (key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

var list = store.fetch("zhou-class")

/*分割线   ---之前写的*/
/*var list = [

	{
		title:"吃饭睡觉打豆豆",
		isChecked:false,
	},
	{
		title:"吃饭睡觉打豆豆",
		isChecked:true,
	}
];*/
//过滤有三种情况  all  finished  unfinished
			var filter = {
				all:function(list){
					return list;
				},
				finished:function(list){
					return list.filter(function(item){
						return item.isChecked;
					})
				},
				unfinished:function(list){
					return list.filter(function(item){
						return !item.isChecked;
					})
				}
			}

var vm = new Vue({
	el:".main",
	data:{
		list:list,
		todo:"",
		edtorTodos:"",//记录 正在 编辑的数据
		beforeTitle:"",//记录正在编辑的这天任务的 title
		
		
		//2017.6.12新添
		visibility:"all"//通过这个数值的变化  对数据进行筛选
	},
	
//2017.6.12 新加功能

watch:{
//	list:function(){//监控list这个属性，但这个属性对应的值发生变化就会执行函数
//		store.save("zhou-class",this.list);
//		
//	}

//深层次的监控
list:{
	handler:function(){
		store.save("zhou-class",this.list);
	},
	deep:true
}


},
	
	computed:{
		noCheckeLength:function(){
			return this.list.filter(function(item){
				return  !item.isChecked
			}).length
		},
		//2017.6.12新添
		//过滤数据
		filteredList:function(){
			//找到过滤函数，就返回过滤后的数据，如果没有就返回所有的数据
			return filter[this.visibility] ? filter[this.visibility](list) : list;
		}
	},
	methods:{
		//addTodo(data,ev){ 
		addTodo(){ //添加任务 (简写形式，es6语法)  ---》    addTodo:function(){}
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
		edtorTodoed(todo){//编辑完成
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
				console.log("binding=====",binding);  //里面有个值 value  看这个 值  是为 true  还是 false
				
				
				if(binding.value){
					el.focus();
				}
			}
		}
	}
});

function washHashChange(){
	var hash = window.location.hash.slice(1);
	console.log(hash);
	
	
	vm.visibility = hash;
}

washHashChange();

window.addEventListener("hashchange",washHashChange);