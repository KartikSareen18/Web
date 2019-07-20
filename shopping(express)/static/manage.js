var products = [];
var productId = 1;
var i=0;
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var aAddProduct = document.getElementById("aAddProduct");
aAddProduct.addEventListener("click", function(event)
					  {  
						    createNewProductPanel(); 
					  });

/*if(localStorage.getItem("products"))
{
	var data=localStorage.getItem("products");
	var data1=JSON.parse(data);
	if(data1.length!=0)
	{
	products=data1;
	var j;
	for(j=0;j<products.length;j++)
		addProductToDOM(products[j]);
	j--;
	productId=data1[j].Id;
	productId++;
	}
}*/

       var xhr=new XMLHttpRequest();
       xhr.open("GET","/name1");
       xhr.send();
       xhr.onload=function()
       {
           console.log(xhr.responseText);
           var data=JSON.parse(xhr.responseText);
		   if(data.length!=0)
			{
				products=data;
				var j;
				for(j=0;j<products.length;j++)
					addProductToDOM(products[j]);
				j--;
				productId=data[j].Id;
				productId++;
			}
	   }
		   
function createNewProductPanel()
{
	hideAddNewProductLink();
	
	/* Label - Product Quantity */
	var lblAddProduct=document.createElement("label");
	lblAddProduct.innerHTML="Add New Product";
	lblAddProduct.setAttribute("style","font-weight:bold");
	divAddProduct.appendChild(lblAddProduct);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/*Textbox - Product Name*/
	var txtProductName=document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
	txtProductName.setAttribute("placeholder","Enter the product name");
	txtProductName.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductName);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/*Textbox - Product Description*/
	var txtProductDesc=document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
	txtProductDesc.setAttribute("placeholder","Enter the product description");
	txtProductDesc.setAttribute("style","width:250px;height:50px");
	divAddProduct.appendChild(txtProductDesc);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
		
	/*Textbox - Product Price*/
	var txtProductPrice=document.createElement("input");
	txtProductPrice.setAttribute("type","text");
	txtProductPrice.setAttribute("id","txtProductPrice");
	txtProductPrice.setAttribute("placeholder","Enter the product price");
	txtProductPrice.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/*Textbox - Product Quantity*/
	var txtProductQuantity=document.createElement("input");
	txtProductQuantity.setAttribute("type","text");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
	txtProductQuantity.setAttribute("placeholder","Enter the product quantity");
	txtProductQuantity.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/*Button - Add Product*/
	var btnAddButton=document.createElement("button");
	btnAddButton.setAttribute("id","btnAddButton");
	btnAddButton.innerHTML="Add Product";
	divAddProduct.appendChild(btnAddButton);
	
	btnAddButton.addEventListener("click",function(event)
						{
							addProductToArray();
						});
}


function addProductToArray()
{
	var objProduct=new Object();
	objProduct.Id=productId;
	objProduct.Name=document.getElementById("txtProductName").value;
	objProduct.Desc=document.getElementById("txtProductDesc").value;
	objProduct.Price=document.getElementById("txtProductPrice").value;
	objProduct.Quantity=document.getElementById("txtProductQuantity").value;
	
	if( objProduct.Price == "" || objProduct.Name == "" || objProduct.Desc == "" || objProduct.Quantity == "") {
		alert("All Fields are required");
		deleteNewProductPanel();
		unHideAddNewProductLink();
		return;
	}
    
	products.push(objProduct);
	storage(products);
	addProductToDOM(objProduct);
	deleteNewProductPanel(divAddProduct);
	productId++;
}


function addProductToDOM(objProduct)
{
	//create a new DIV for this product
	var divProduct=document.createElement("div");
	divProduct.setAttribute("id",objProduct.Id);
	
	//create a anchor for product name
	var aProductName = document.createElement("a");
	aProductName.setAttribute("href","#");
	aProductName.innerHTML = objProduct.Name;
	divProduct.appendChild(aProductName);
	aProductName.addEventListener("click",function(e)
											{
												var id=e.target.parentNode.id;
												var selectedProductIndex=getProductIndex(id);
												getProductDetails(selectedProductIndex);
											});

	insertBlankLine(divProduct);

	//create a label for product description
	var lblProductName=document.createElement("label");
	lblProductName.innerHTML=objProduct.Desc;
	divProduct.appendChild(lblProductName);

	insertBlankLine(divProduct);

	//create a anchor for deleting this product
	var aDelete=document.createElement("a");
	aDelete.setAttribute("href","#");
	aDelete.innerHTML="Delete";
	divProduct.appendChild(aDelete);
	insertBlankLine(divProduct);
	aDelete.addEventListener("click",function(event)
					{
						var targetParent = event.target.parentNode;
						var selectedProductIndex = getProductIndex(parseInt(targetParent.id)); 
						removeFromProductsArray(selectedProductIndex);
						targetParent.parentNode.removeChild(targetParent);	
					});

	//create a anchor for editing this product
	var aEdit=document.createElement("a");
	aEdit.setAttribute("href","#");
	aEdit.innerHTML="Edit";
	divProduct.appendChild(aEdit);
	aEdit.addEventListener("click",function(event)
					{
						var targetParent=event.target.parentNode;
						console.log(targetParent.id);
						var selectedProductIndex=getProductIndex(parseInt(targetParent.id));
						updateProduct(targetParent,selectedProductIndex,products[selectedProductIndex]);
					});
	
	insertBlankLine(divProduct);
	insertBlankLine(divProduct);
	aProductName.addEventListener("click",function(event)
					{
						var selectedProductIndex=getProductIndex(parseInt(event.target.parentNode.id));
						getProductDetails(selectedProductIndex);
					});
	divListProducts.appendChild(divProduct);
	unhideAddNewProductLink();
	
}


function updateProduct(targetParent,selectedProductIndex,obj)
{
	hideAddNewProductLink();
	
	/*Label-Product Quantity*/
	var lblUpdateProduct=document.createElement("label");
	lblUpdateProduct.innerHTML = "Edit Product";
	lblUpdateProduct.setAttribute("style","font-weight:bold");
    divAddProduct.appendChild(lblUpdateProduct);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Name */ 
	var txtProductName = document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
	txtProductName.value=obj.Name;
    txtProductName.setAttribute("placeholder", "Enter the product name");	
	txtProductName.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductName);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Description */ 
	var txtProductDesc = document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
	txtProductDesc.value=obj.Desc;
	txtProductDesc.setAttribute("placeholder", "Enter the product description");	
	txtProductDesc.setAttribute("style","width:250px ; height:50px");
	divAddProduct.appendChild(txtProductDesc);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Price */ 
	var txtProductPrice = document.createElement("input");
	txtProductPrice.setAttribute("type","text");
	txtProductPrice.setAttribute("id","txtProductPrice");
	txtProductPrice.value=obj.Price;
    txtProductPrice.setAttribute("placeholder", "Enter the product price");	
	txtProductPrice.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Quantity */ 
	var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","text");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
	txtProductQuantity.value=obj.Quantity;
    txtProductQuantity.setAttribute("placeholder", "Enter the product quantity");	
	txtProductQuantity.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity);
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* Button - Update Product */ 
	var btnUpdateButton = document.createElement("button");
	btnUpdateButton.setAttribute("id","btnUpdateButton");
	btnUpdateButton.innerHTML = "Save Changes";
	divAddProduct.appendChild(btnUpdateButton);		
		
    btnUpdateButton.addEventListener("click", function(event)
						{	
							obj.Name=txtProductName.value;
							obj.Desc=txtProductDesc.value;
							obj.Price=txtProductPrice.value;
							obj.Quantity=txtProductQuantity.value;
							products[selectedProductIndex]=obj;
							deleteNewProductPanel(targetParent);
							updateDiv(targetParent,products[selectedProductIndex]);
							deleteAllNodes();
							unhideAddNewProductLink();
							storage(products);
						});	
	
}

function storage(products)
{
	/*var str=JSON.stringify(products);
	if(i>0)
		localStorage.removeItem("products");
	i++;
	localStorage.setItem("products",str);
	var a=localStorage.getItem("products");
	console.log(a);*/
	var xhr=new XMLHttpRequest();
    xhr.open("POST","/name1");
    xhr.send(JSON.stringify(products));
}

function updateDiv(targetParent,obj)
{
	var aProductName = document.createElement("a");
	aProductName.setAttribute("href","#");
	aProductName.innerHTML = obj.Name;
	targetParent.appendChild(aProductName);
	aProductName.addEventListener("click",function(e)
											{
												var id=e.target.parentNode.id;
												var selectedProductIndex=getProductIndex(id);
												getProductDetails(selectedProductIndex);
											});

	insertBlankLine(targetParent);

	//create a label for product description
	var lblProductName=document.createElement("label");
	lblProductName.innerHTML=obj.Desc;
	targetParent.appendChild(lblProductName);

	insertBlankLine(targetParent);

	//create a anchor for deleting this product
	var aDelete=document.createElement("a");
	aDelete.setAttribute("href","#");
	aDelete.innerHTML="Delete";
	targetParent.appendChild(aDelete);
	aDelete.addEventListener("click",function(event)
					{
						var targetParent = event.target.parentNode;
						var selectedProductIndex = getProductIndex(parseInt(targetParent.id)); 
						removeFromProductsArray(selectedProductIndex);
						targetParent.parentNode.removeChild(targetParent);
					});
					
	insertBlankLine(targetParent);

	//create a anchor for editing this product
	var aEdit=document.createElement("a");
	aEdit.setAttribute("href","#");
	aEdit.innerHTML="Edit";
	targetParent.appendChild(aEdit);
	aEdit.addEventListener("click",function(event)
					{
						var targetParent=event.target.parentNode;
						var selectedProductIndex=getProductIndex(parseInt(targetParent.id));
						updateProduct(targetParent,selectedProductIndex,products[selectedProductIndex]);
					});
	insertBlankLine(targetParent);
	insertBlankLine(targetParent);
}

function deleteAllNodes()
{
	var childNodes=divAddProduct.childNodes;
	for(var i=0;childNodes.length>0;)
	{
		divAddProduct.removeChild(childNodes[i]);
	}
}
function getProductDetails(selectedProductIndex)
{
	console.log( "Name : " + products[selectedProductIndex].Name + "  Desc: " + products[selectedProductIndex].Desc + 
               "   Price : " + products[selectedProductIndex].Price + "  Quantity: " + products[selectedProductIndex].Quantity);
}


function deleteNewProductPanel(targetParent)
{
   var childNodes = targetParent.childNodes;
   for (var i = 0; childNodes.length>0;) 
   {
		targetParent.removeChild(childNodes[i]);
   }
}


// Given a product ID, returns the index to the product data in products. 
function getProductIndex(id) 
{
	for(var i=0;i<products.length;i++)
		if(products[i].Id==id)
			return i;
}


function removeFromProductsArray(selectedProductIndex)
{
	products.splice(selectedProductIndex,1);
	storage(products);
}


function hideAddNewProductLink()
{
	aAddProduct.setAttribute("style","visibility:hidden");
}


function unhideAddNewProductLink()
{
	aAddProduct.setAttribute("style","visibility:visible");
}


function insertBlankLine(targetElement)
{
	var br=document.createElement("br");
	targetElement.appendChild(br);
}