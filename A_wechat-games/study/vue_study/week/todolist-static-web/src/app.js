//var data = [
//	{
//		id:Date.now()+Math.random(),
//		title:'学习',
//		checked:true
//	},
//	{
//		id:Date.now()+Math.random(),
//		title:'远足',
//		checked:false
//	}
//]
//从localStorage中取值
var data = JSON.parse(localStorage.getItem("zhou-vue")) || [];

let vm = new Vue({
	el:"#app",
	data:{
		list:data,
		todoValue:'',//把这个数据绑定到添加的输入框内，当要添加的时候 直接在todoValue内找就行了
		editId:'',//保存要编辑的id
		beforeTitle:'',
		hash:'all'//active complete
	},
	watch:{
		list:{//对List进行深度监控
			deep:true,
			handler(){
				localStorage.setItem("zhou-vue",JSON.stringify(this.list));
			}
		}
	},
	methods:{
		addTodo(){//添加
			//往list里添加对象
			if(this.todoValue != ''){
				this.list.push({
					id:Date.now()+Math.random(),
					title:this.todoValue,
					checked:false
				})
				
				//未添加前，todoValue是空的,添加完成时置空
				this.todoValue = '';
			}else{
				this.list.push({
					id:Date.now()+Math.random(),
					title:"我是默认的，如果你要编辑，请双击我吧！",
					checked:false
				})
				//添加时 要往数组中存一次
				//localStorage.setItem("zhou-vue",JSON.stringify(this.list));
				//未添加前，todoValue是空的,添加完成时置空
				this.todoValue = '';
			}
			
		},
		removeTodo(i){//删除
			this.list.splice(i,1)//在i处位置，删除一项
		},
		editTodo(todo,i){//编辑
			//编辑的时候，直接把要编辑的数据传过来
			//把要编辑的数据的id 直接给标示的id 
			//在页面层，只要判断 要编辑的id 和标示的id 是不是相同，如果相同，就加上 class="editing"
			this.editId = todo.id;
			/*自动获取焦点*/
			this.$nextTick(()=>{
				this.$refs.editInput[i].focus();
				todo.title = ""
			})
			/*
			 保存要编辑的  title
			 * */
			this.beforeTitle = todo.title;
		},
		editDone(todo,i){//编辑完成
			//只要将要编辑的那个标识的Id 设置为空
			//为空之后，页面上判断两个id不同的时候，就会去掉class="editing"
			this.editId = '';
			/*如果输入元素的这条 是空的，就要删除这条数据
			 
			 * todo.title.trim() 找到这条数据的title
			 * 并判断是否为空
			 * 如果为空直接删除这条数据
			 * */
			if(todo.title.trim() === ''){
				this.removeTodo(i)
			}
			
		},
		cancelEdit(todo){//取消编辑
			//首先无论是否有编辑，在按esc键时都要将这条数据变成编辑之前的状态
			this.editId = '';
			//如果取消编辑，要把编辑前的值 值给到现在取消编辑的数据 的title
			 todo.title = this.beforeTitle
		}
	},
	computed:{
		//计算属性 要么获取要么设置，只写一个是在 获取时触发
		//判断是否全部选中
		isCheckedAll:{
			get(){//获取属性
				return this.list.every(item => item.checked)
			},
			set(newValue){//设置属性
				this.list.forEach(item => item.checked = newValue)
			}
		},
		unCheckedLen(){//已选中的数据
			return this.list.filter(item => !item.checked)
			.length;
		},
		checkedLen(){//已选中的数据
			return this.list.filter(item => item.checked)
			.length;
		},
		allListLen(){//所有数据
			return this.list.length;
		},
		filterList(){//根据Hash值对数据进行过滤
			if(this.hash === 'all'){//所有数据
				return this.list
			}else if(this.hash === 'active'){//根据Hash值过滤未被选中的数据
				return this.list.filter(item => !item.checked)
			}else if(this.hash === 'completed'){//根据Hash值过滤已经选中的数据
				return this.list.filter(item => item.checked)
			}
		}
	}
})
//程序在一开始就要加载 此时就要获取hash值 ，hash值设置到data中
window.onhashchange = function(){
	let hash = window.location.hash.slice(1)
	if(hash){
		vm.hash = hash
	}else{
		vm.hash = 'all'
	}
}
window.onhashchange ();
 
