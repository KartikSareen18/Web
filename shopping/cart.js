var cart=[];
var products=[];
var list=document.getElementById("list");
if(localStorage.getItem("products"))
{
	var data=localStorage.getItem("products");
	var data1=JSON.parse(data);
	products=data1;
}
if(localStorage.getItem("cart"))
{
	var data=localStorage.getItem("cart");
	var data1=JSON.parse(data);
	cart=data1;
	for(var j=0;j<cart.length;j++)
		addProductToDOM(cart[j]);
	displayTotal();
}

function addProductToDOM(objProduct)
{
	var li=document.createElement("li");
	li.setAttribute("id",objProduct.Id);
	li.innerHTML=objProduct.Name;
	
	insertBlankLine(li);
	var input=document.createElement("input");
	input.setAttribute("placeholder","Enter Quantity");
	input.value=objProduct.Quantity;
	li.appendChild(input);
	
	input.addEventListener("input",function(e)
	{
		
		if(input.value!="")
		{
				var targetParent=e.target.parentNode;
				var selectedProductIndex=getIndex(products,targetParent.id);
				var selectedCartIndex=getIndex(cart,targetParent.id);
				if(selectedProductIndex==null)
				{
					var objProduct=new Object();
					objProduct.Id=cart[selectedCartIndex].Id;
					objProduct.Name=cart[selectedCartIndex].Name;
					objProduct.Desc=cart[selectedCartIndex].Desc;
					objProduct.Price=cart[selectedCartIndex].Price;
					objProduct.Quantity=cart[selectedCartIndex].Quantity;
					products.push(objProduct);
					selectedProductIndex=getIndex(products,targetParent.id);
				}
				else
					products[selectedProductIndex].Quantity+=parseInt(cart[selectedCartIndex].Quantity);
				
				if(parseInt(input.value)>parseInt(products[selectedProductIndex].Quantity))
				{
					input.value=objProduct.Quantity;
					products[selectedProductIndex].Quantity-=parseInt(cart[selectedCartIndex].Quantity);
					alert("Quantity not sufficient");
				}
				else
				{
					updateCartArray(selectedCartIndex,input);
					changeQuantityFromProductsArray(selectedProductIndex,input);
					//displayTotal();
				}
			
		}
	});

	var label=document.createElement("label");
	label.innerHTML="Rs."+(objProduct.Quantity*objProduct.Price);
	li.appendChild(label);
	
	insertBlankLine(li);
	var btn=document.createElement("button");
	btn.innerHTML="Remove From Cart";
	btn.addEventListener("click",function(e)
								{
										var targetParent=e.target.parentNode;
										var selectedProductIndex=getIndex(products,targetParent.id);
										var selectedCartIndex=getIndex(cart,targetParent.id);
										if(selectedProductIndex!=null)
											products[selectedProductIndex].Quantity+=parseInt(input.value);
										else
										{
											products.push(objProduct);
											selectedProductIndex=getIndex(products,targetParent.id);
										}
										cart.splice(selectedCartIndex,1);
										storage1(products);
										targetParent.parentNode.removeChild(targetParent);
										storage(cart);
										var div=document.getElementById("total");
										div.innerHTML="";
										displayTotal();
								});
								
	li.appendChild(btn);
	insertBlankLine(li);
	insertBlankLine(li);
	list.appendChild(li);
}

function displayTotal()
{
	var div=document.getElementById("total");
	var sum=0;
	for(var i=0;i<cart.length;i++)
		sum+=(parseInt(cart[i].Quantity)*parseInt(cart[i].Price));
	if(cart.length!=0)
	div.innerHTML="Total Price: "+sum;
}
function updateCartArray(selectedCartIndex,input)
{
	cart[selectedCartIndex].Quantity=input.value;
	storage(cart);
	deleteCart();
	for(var i=0;i<cart.length;i++)
		addProductToDOM(cart[i]);
	displayTotal();
}
function deleteCart()
{
	var childNodes = list.childNodes;
   for (var i = 0; childNodes.length>0;) 
   {
		list.removeChild(childNodes[i]);
   }
   
}
function storage1(products)
{
	var str=JSON.stringify(products);
	localStorage.removeItem("products");
	localStorage.setItem("products",str);
	var a=localStorage.getItem("products");
	console.log(a);
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
	products[selectedProductIndex].Quantity-=parseInt(input.value);
	
	if(products[selectedProductIndex].Quantity==0)
		products.splice(selectedProductIndex,1);
	storage1(products);
}

function getIndex(array,id) 
{
	for(var i=0;i<array.length;i++)
		if(array[i].Id==id)
			return i;
}

function insertBlankLine(targetElement)
{
	var br=document.createElement("br");
	targetElement.appendChild(br);
}