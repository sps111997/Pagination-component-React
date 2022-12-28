# Pagination-component-React

Design A Pagination compoinenet Like Amazon.in


Or https://codesandbox.io/s/v0hjxw (A antd solution) 

Feature:
Either we have Previoud & next text or only arrow or booths
Size of pagintor will be passed by props
Ex: In This given example “5” is size of paginator “1,2,3,..,5”
Total Size is also “5”
Main Aim is Show Active Page and Active page -1 and ActivePage +1, First Page and Last page So if total page is less then “5” we will show like this if toal page is “4” “1,2,3,4”
We will pass a props which show maximum number of paginator we need to show(which is also not be less then 5)

Code Link: Coming Soon

So I  am planning to create a Array which conten page number. If totalPages is greater than maxPaginator we will push -1 and -2 we it show “..”

Example: [1,2,3,4,5,6] => 1->2->3->4->5->6
[1,2,3,-1,7,8] => 1->2->3->..->7->8
[1,2,3,-1,10,11,12,-2,99,100] => 1->2->3->”..”->10->11->12->”..”->99->100


