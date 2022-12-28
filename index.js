//Use Pagination component  
 <Pagination
                currentPage={1}
                size={teams.length}
                pageSizes={["10", "20", "30"]}
                onPageChange={(value) => console.log(value)} // TODO change this function after API
                showBorder
            />
