
function g(o){return document.getElementById(o);}
function HoverLi(n)
{
	//如果有N个标签,就将i<=N;
	for(var i=1;i<=5;i++){g('tb_'+i).className='normaltab';g('tbc_0'+i).className='undis';}
	g('tbc_0'+n).className='dis';g('tb_'+n).className='hovertab';
}
//-->
