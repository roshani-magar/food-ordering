import React from 'react'

const Category = () => {
  return (
     <div>
        <div className='text-black w-[500px] mx-[100px] mt-[100px] mb-[50px]' >
            <h1 className='text-4xl font-bold'>Explore Our Menu</h1>
            <p>A rich and creamy blend of pancetta, eggs, and Parmesan cheese, tossed with al dente spaghetti and finished with a touch of black pepper. This classic Roman dish offers a decadent and comforting taste experience</p>
            </div>
          <div className='flex flex-row items-center justify-between gap-11 mx-[100px] mb-[100px]'>
             <div className='flex items-center gap-2 flex-col'>
                <img  width="400px" src="images/pizza.jpg" alt="" />
                <h3 className='text-2xl font-bold'>Pizza</h3>
             </div>
             <div className='flex items-center gap-2 flex-col'>
                <img width="400px"  src="images/burger.jpg" alt="" />
                <h3 className='text-2xl font-bold'>Burger</h3>
             </div>
             <div className='flex items-center gap-2 flex-col'>
                <img  width="400px" src="images/momo.png" alt="" />
                <h3 className='text-2xl font-bold'>Momo</h3>
             </div>
             <div className='flex items-center gap-2 flex-col'>
                <img  width="400px" src="images/biryani.png" alt="" />
                <h3 className='text-2xl font-bold'>Biryani</h3>
             </div>
             <div className='flex items-center gap-2 flex-col'>
                <img width="400px"  src="images/pizza.jpg" alt="" />
                <h3 className='text-2xl font-bold'>Pizza</h3>
             </div>
            </div>
    </div>
  )
}

export default Category
