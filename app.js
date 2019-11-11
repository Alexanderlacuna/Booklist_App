form=document.forms.form_data
console.log(form)

var itemList=document.querySelector(".item_list")
var itemBody=document.querySelector(".item_body")

var btn=document.querySelector(".btn_danger")

itemList.addEventListener("click",(e)=>{

	if(e.target.classList.contains("btn_danger")){
		// getting title of item to delete to deal with localstorage

		let itemToDelete=e.target.parentNode.firstElementChild.textContent
		// console.log(e.target.parentNode.firstElementChild.textContent)

		deleteItem(itemToDelete)
		e.target.parentNode.remove()

	}
	
})
// btn.addEventListener("click",(e)=>{
// 	let test={
// 		"dwe":"Dwed"
// 	}
// 	addItem(test)

// 	console.log(e.target.parentNode)

// 	e.target.parentNode.remove()
// })


function handleClick(e){

	console.log(e.target.parentNode)


}




form.addEventListener("submit",(e)=>{
	e.preventDefault()
	var title=form.title.value

	var description=form.description.value

	if (title && description) {
		console.log(`the title is ${title} and the description is ${description}`)

		var newItem=document.createElement("div")
		newItem.className="item_body"
		newItem.innerHTML=`
		<p class="item">${title}</p>
		<p>${description}</p>
		<button class="btn btn_danger" click="handleClick()">delete</button>`

		// itemList.insertBefore(newItem,itemBody)

		// console.log(newItem.innerHTML

		let testItem={
			title:title,
			description:description
		}
		 addItem(testItem)
		  itemList.appendChild(newItem)

		  // add items to localStorage




	}


})


function addToStorage(items){
	// var items=[{
	// 	item:"test"
		
	// }]

	// console.log(items)

	localStorage.setItem("items",JSON.stringify(items))

	// let test=JSON.parse(localStorage.getItem("items"))
	// console.log(test)
}

function getItems(){
	items=JSON.parse(localStorage.getItem("items"))
	console.log(items)

	return items
}
function deleteItem(deleteItem=null){

	if (!deleteItem) {
		console.log("no item to be deleted")
	}

	items=getItems()
	let found=items.some((item)=>item.title==deleteItem)
	// console.log(`has the item being found ${found}`)

	if (found) {

		items=items.filter((item)=>item.title!=deleteItem)
		// items=items.filter((item.title==deleteItem))
		addToStorage(items)
	}
	
}



function addItem(item){

	items=getItems()
    if (!items) {
    	items=[]
    }
	// if (items) {}
	

	let itemList=items.push(item)
	console.log(itemList)
	addToStorage(items)



	
	


}

// search bar items

let search=document.querySelector(".searchBar")

search.addEventListener("keyup",(e)=>{
	
	var filter=e.target.value

	var items=document.querySelectorAll(".item")


	let arraylist=Array.from(items)
	// console.log(arraylist)
	
	arraylist.forEach((item)=>{
		let itemText=item.textContent.toLowerCase();
		if (itemText.toLowerCase().indexOf(filter)>-1) {
			
			item.parentNode.style.display=""
			
		}

		else{
			item.parentNode.style.display="none"
		}

	})


})


// getting data from localStorage
window.addEventListener("DOMContentLoaded",(e)=>{
	let items=getItems()

	if (items) {

		items.forEach((item)=>{

				var newItem=document.createElement("div")
				newItem.className="item_body"
				newItem.innerHTML=`
				<p class="item">${item.title}</p>
				<p>${item.description}</p>
				<button class="btn btn_danger" click="handleClick()">delete</button>`
				itemList.appendChild(newItem)


		})

	


	}
	

})

