# calculated props

## Challenge 1: a=b/10; b=a*10

Try to implement object with this behavior
use any framework, focuse on syntax beauty and cycles


	var o={
		a:(b)=>b/10,
		b:(a)=>a*10,
		//c:(a,b)=>a+b
	}

## Chalenge 2: nested tree, adressing other objects in tree

	var o={
		a:(b)=>b/10,
		b:(a)=>a*10,
		c:{
			d:l(a,b,e)=>a+b,"../a","../b"),
			e:10
		}
	}


