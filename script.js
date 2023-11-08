document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.toggle');
     const showcase = document.querySelector('.showcase');

     menuToggle.addEventListener('click', () => {
       menuToggle.classList.toggle('active');
       showcase.classList.toggle('active');
     })
     

 function videoslider(links){
           document.querySelector(".slider").src = links;
       }

       // Draggble Carusal

 const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
   // showing and hiding prev/next icon according to carousel scroll left value
   let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
   arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
   arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
   icon.addEventListener("click", () => {
       let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
       // if clicked icon is left, reduce width value from the carousel scroll left else add to it
       carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
       setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
   });
});

const autoSlide = () => {
   // if there is no image left to scroll then return from here
   if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

   positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
   let firstImgWidth = firstImg.clientWidth + 14;
   // getting difference value that needs to add or reduce from carousel left to take middle img center
   let valDifference = firstImgWidth - positionDiff;

   if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
       return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
   }
   // if user is scrolling to the left
   carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
   // updatating global variables value on mouse down event
   isDragStart = true;
   prevPageX = e.pageX || e.touches[0].pageX;
   prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
   // scrolling images/carousel to left according to mouse pointer
   if(!isDragStart) return;
   e.preventDefault();
   isDragging = true;
   carousel.classList.add("dragging");
   positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
   carousel.scrollLeft = prevScrollLeft - positionDiff;
   showHideIcons();
}

const dragStop = () => {
   isDragStart = false;
   carousel.classList.remove("dragging");

   if(!isDragging) return;
   isDragging = false;
   autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);



fetch('conn6.php')
  .then(response => response.json())
  .then(data => {
    // Process the data received from connect.php
    const products = processData(data);
    displayProducts(products);

  })
  .catch(error => {
    console.error('Error:', error);
  });

// Function to process the data
function processData(data) {
  const products = {};

  // Group the data by month
  data.forEach(entry => {
    const month = entry.month;
    if (!products[month]) {
      products[month] = [];
    }
    products[month].push(entry);
  });

  return products;
}

// Function to display the products
function displayProducts(products) {
  const container = document.querySelector('.insides');

  // Clear any existing content
  container.innerHTML = '';

  // Iterate over the products and create HTML elements
  Object.keys(products).forEach(month => {
    const monthProducts = products[month];

    monthProducts.forEach(product => {
      const sensorDiv = document.createElement('div');
      sensorDiv.classList.add('sensor');

      const span = document.createElement('span');
      span.classList.add('material-symbols-outlined');
      span.textContent = 'thermostat';

      const middleDiv = document.createElement('div');
      middleDiv.classList.add('middle');

      const leftDiv = document.createElement('div');
      leftDiv.classList.add('left');

      const h3 = document.createElement('h3');
      h3.textContent = product.name;

      const h2 = document.createElement('h2');
      h2.textContent = `${product.profit}%`;

      const progressDiv = document.createElement('div');
      progressDiv.classList.add('progress');

      const h1 = document.createElement('h1');
      h1.textContent = product.product;

      const small = document.createElement('small');
      small.classList.add('text-muted');
      

      // Assemble the HTML structure
      leftDiv.appendChild(h3);
      leftDiv.appendChild(h2);
      middleDiv.appendChild(leftDiv);
      progressDiv.appendChild(h1);
      middleDiv.appendChild(progressDiv);
      sensorDiv.appendChild(span);
      sensorDiv.appendChild(middleDiv);
      sensorDiv.appendChild(small);

      container.appendChild(sensorDiv);
    });
  });
}


fetch('conn1.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);

            // Extract the data arrays
            const labels = data.dates; // Assuming dates are used as labels
            const datasets = [
                {
                    label: 'X Data',
                    data: data.x,
                    borderColor: 'blue',
                    fill: false
                },
                {
                    label: 'Y Data',
                    data: data.y,
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'Z Data',
                    data: data.z,
                    borderColor: 'green',
                    fill: false
                }
            ];

            // Create the chart
            const ctx = document.getElementById('lineGraph1').getContext('2d');
            const multilineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Dates'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Values'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));






 fetch('conn2.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);

            // Extract the data arrays
            const labels = data.dates; // Assuming dates are used as labels
            const datasets = [
                {
                    label: 'X Data',
                    data: data.gx,
                    borderColor: 'blue',
                    fill: false
                },
                {
                    label: 'Y Data',
                    data: data.gy,
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'Z Data',
                    data: data.gz,
                    borderColor: 'green',
                    fill: false
                }
            ];

            // Create the chart
            const ctx = document.getElementById('lineGraph3').getContext('2d');
            const multilineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Dates'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Values'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));


fetch('conn3.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);

            // Extract the data arrays
            const labels = data.dates; // Assuming dates are used as labels
            const datasets = [
                {
                    label: 'X Data',
                    data: data.x,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true
                },
                {
                    label: 'Y Data',
                    data: data.y,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true
                },
                {
                    label: 'Z Data',
                    data: data.z,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true
                }
            ];

            // Create the chart
            const ctx = document.getElementById('lineGraph2').getContext('2d');
            const multilineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Dates'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Values'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));


fetch('conn4.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);

            // Extract the data arrays
            const labels = data.dates; // Assuming dates are used as labels
            const datasets = [
                {
                    label: 'X Data',
                    data: data.gx,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true
                },
                {
                    label: 'Y Data',
                    data: data.gy,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true
                },
                {
                    label: 'Z Data',
                    data: data.gz,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true
                }
            ];

            // Create the chart
            const ctx = document.getElementById('lineGraph4').getContext('2d');
            const multilineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Dates'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Values'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));

 


fetch('conn5.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);

            // Extract the data arrays
            const labels = data.dates; // Assuming dates are used as labels
            const datasets = [
                {
                    label: 'maxtemperature',
                    data: data.maxtemp,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderWidth: 1
                },
                {
                    label: 'mintemperature',
                    data: data.mintemp,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderWidth: 1
                },
            ];

            // Create the chart
            const ctx = document.getElementById('doubleBarGraph').getContext('2d');
            const multilineChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Dates'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Values'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));




});

// new Chart(pieChart, {
            //     type: 'pie',
            //     data: {
            //         labels: productProfitData.map(item => item.label),
            //         datasets: [
            //             {
            //                 data: productProfitData.map(item => item.data),
            //                 backgroundColor: productProfitData.map(item => item.backgroundColor)
            //             }
            //         ]
            //     },
            //     options: {
            //         responsive: true,
            //         maintainAspectRatio: false,
            //         plugins: {
            //             legend: {
            //                 display: true
            //             },
            //             title: {
            //                 display: true,
            //                 text: 'Pie Chart - Product Profit'
            //             }
            //         }
            //     }
            // });

                        // '#2085ec',
                        // '#72b4eb',
                        // '#0a417a',
                        // '#8464a0',
                        // '#cea9bc',
                        // '#323232',
                        // '#dec4ad',





