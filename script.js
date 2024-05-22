const url = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";

fetch(url)
    .then(res => res.json())
    .then(data => {
        let pageData = data;

        // paginate function
        function paginate(data, count, pageContainer) {
            let currentPage = 1;
            const totalPages = Math.ceil(data.length/count);

            // listing each page items
            function showItems(page) {
                const start = (page-1)* count;
                const end = start+count;
                const pageItems = data.slice(start, end);
                // console.log(pageItems);

                const itemsDiv = document.getElementById("items");
                itemsDiv.innerHTML = "";
                itemsDiv.classList.add("table-responsive");
                const heading = document.createElement("h1");
                heading.textContent = `Customer Details on Page: ${page}`;
                heading.setAttribute("id", "title");
                itemsDiv.appendChild(heading);
                const para = document.createElement("p");
                para.textContent = "Details of persons as per clicked page";
                para.setAttribute("id", "description");
                itemsDiv.appendChild(para);

                let tableHeaders = ["ID", "Name", "Email"];
                let detailsTable = document.createElement("table");
                detailsTable.classList.add("table","table-bordered");
                let head = document.createElement("thead");
                let headrow = document.createElement("tr");

                tableHeaders.forEach(h => {
                    let header = document.createElement("th");
                    header.innerText = h;
                    header.setAttribute("scope","col");
                    headrow.appendChild(header);
                });

                head.appendChild(headrow);
                detailsTable.appendChild(head);

                let body = document.createElement("tbody");
                body.className="tableBody";
                body.id="tableFill";

                pageItems.forEach((i) => {
                    let data = Object.keys(i);
                    let datarow = document.createElement("tr");
                    data.forEach(cell => {
                        const datacol = document.createElement("td");
                        datacol.innerText = i[cell];
                        datarow.appendChild(datacol);
                    })
                    body.appendChild(datarow);
                });
                detailsTable.append(body);
                itemsDiv.append(detailsTable);

            }

            // adding pagination to div
            function includePagination() {
                const paginationDiv = document.querySelector(pageContainer);
                // paginationDiv.innerHTML="";
                paginationDiv.classList.add("d-flex", "justify-content-center");
                // prev and next buttons
                let prevPage;
                let nextPage;
                const prevBtn = document.createElement("button");
                prevBtn.classList.add("btn", "btn-outline-dark")
                let prev = document.createElement("a");
                prev.href = "#";
                prev.innerText = "PREV";
                prev.addEventListener("click",(e)=>{
                    e.preventDefault();
                    showItems(prevPage);
                    updatePage(prevPage);
                });
                prevBtn.appendChild(prev);
                paginationDiv.appendChild(prevBtn);
                const nextBtn = document.createElement("button");
                nextBtn.classList.add("btn", "btn-outline-dark");
                let next = document.createElement("a");
                next.href = "#";
                next.innerText = "NEXT";
                paginationDiv.appendChild(next);
                next.addEventListener("click",(e)=>{
                    e.preventDefault();
                    showItems(nextPage);
                    updatePage(nextPage);
                });
                nextBtn.appendChild(next);
                paginationDiv.appendChild(nextBtn);

                function updatePage(i) {
                    if(i>1 && i< totalPages){
                        prevPage=i-1;
                        nextPage=i+1;
                    }
                    if(i==1){
                        nextPage=2;
                    }
                    if(i==totalPages){
                        prevPage=totalPages-1;
                    }
                }

                // end of new code
                for(let i=1; i<= totalPages;i++){
                    const btnRef = document.createElement("button");
                    btnRef.classList.add("btn", "btn-outline-dark");
                    const pageRef = document.createElement("a");
                    pageRef.href = "#";
                    pageRef.innerText = i;

                    pageRef.addEventListener("click", (e) => {
                        e.preventDefault();
                        currentPage = i;      
                        showItems(currentPage);
                        updatePage(currentPage);
                    });
                    btnRef.appendChild(pageRef);
                    paginationDiv.appendChild(btnRef);
                }
            }
            showItems(currentPage);
            includePagination();
        }

        // final function calling
        const itemsPerPage = 5;
        const pageContainer = "#buttons";
        paginate(pageData, itemsPerPage, pageContainer);
    });

