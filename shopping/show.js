var products = [];
var cart=[];
var list=document.getElementById("list");
if(localStorage.getItem("products"))
{
	var data=localStorage.getItem("products");
	var data1=JSON.parse(data);
	products=data1;
	for(var j=0;j<products.length;j++)
		addProductToDOM(products[j]);
}
if(localStorage.getItem("cart"))
{
	var data=localStorage.getItem("cart");
	var data1=JSON.parse(data);
	cart=data1;
}
function addProductToDOM(objProduct)
{
	var li=document.createElement("li");
	li.setAttribute("id",objProduct.Id);
	li.innerHTML=objProduct.Name;
	
	insertBlankLine(li);
	var input=document.createElement("input");
	input.setAttribute("placeholder","Enter Quantity");
	li.appendChild(input);
	
	var btn=document.createElement("button");
	btn.innerHTML="Add To Cart";
	btn.addEventListener("click",function(e)
									{
										var targetParent=e.target.parentNode;
										var selectedProductIndex=getProductIndex(targetParent.id);
										if(input.value=="")
											alert("Enter quantity!");
										else if(parseInt(input.value)>parseInt(products[selectedProductIndex].Quantity))
										{
											input.value="";
											alert("Quantity not sufficient");
										}
										else
										{
											addProductToCart(selectedProductIndex,input);
											changeQuantityFromProductsArray(selectedProductIndex,input);
											targetParent.parentNode.removeChild(targetParent);
										}
									});
	li.appendChild(btn);
	insertBlankLine(li);
	insertBlankLine(li);
	list.appendChild(li);
}

function addProductToCart(index,input)
{
	var flag=0;
	for(var i=0;i<cart.length;i++)
		if(cart[i].Id==products[index].Id)
		{
			cart[i].Quantity=parseInt(cart[i].Quantity)+parseInt(input.value);
			flag=1;
			break;
		}
	if(flag!=1)
	{
	var objProduct=new Object();
	objProduct.Id=products[index].Id;
	objProduct.Name=products[index].Name;
	objProduct.Desc=products[index].Desc;
	objProduct.Price=products[index].Price;
	objProduct.Quantity=input.value;
	cart.push(objProduct);
	}
	storage(cart);
}

function storage(cart)
{
	var str=JSON.stringify(cart);
	localStorage.setItem("cart",str);
	var a=localStorage.getItem("cart");
	console.log(a);
}

function changeQuantityFromProductsArray(selectedProductIndex,input)
{
	products[selectedProductIndex].Quantity=products[selectedProductIndex].Quantity-input.value;
	if(products[selectedProductIndex].Quantity==0)
		products.splice(selectedProductIndex,1);
	var str=JSON.stringify(products);
	localStorage.removeItem("products");
	localStorage.setItem("products",str);
	var a=localStorage.getItem("products");
	console.log(a);
}

function getProductIndex(id) 
{
	for(var i=0;i<products.length;i++)
		if(products[i].Id==id)
			return i;
}

function insertBlankLine(targetElement)
{
	var br=document.createElement("br");
	targetElement.appendChild(br);
}