  "use client"
  import React,{ useEffect, useState } from 'react'
  import Script from 'next/script'
  import { fetchPayment,fetchUser,initiate } from '@/actions/useractions'
  import { useSession } from 'next-auth/react'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { Bounce } from 'react-toastify';
  import { useSearchParams } from 'next/navigation';
  import { useRouter } from 'next/navigation';



  const Paymentpage =  ({username}) => {
      const {data:session}=useSession();
      const  [paymentform, setPaymentform] = useState({name:"",message:"",amount:""});
      const [currUser,setcurrUser]=useState({});
      const [payment,setPayment]=useState([]);
      const searchParams=useSearchParams();
      const router=useRouter();
      if(!session){
        router.push("/");
      }
      const handleChange=(e)=>{
          const {name,value}=e.target;
          setPaymentform({...paymentform,[name]:value})
      }

      useEffect( () => {
        try{
          getData();
        }catch(error){
          console.error("Get data mai error: ",error);
        }
      }, [session,router])

      useEffect(() => {
        if(searchParams.get("paymentdone")==="true"){
          toast('Thank you for payment', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });  
            router.push(`/${username}`)
        }
      })
      
        
      const getData= async ()=>{
        let u=await fetchUser(username);
        setcurrUser(u);
        let pay=await fetchPayment(username);
        setPayment(pay);
      }
      
      const pay=async (amount)=>{
        console.log(amount);
          try {
            //Get order id from server action
            let x=await initiate(amount,username,paymentform);
            console.log("x ki value: ",x);
            let orderId=x.id;
            var options={
                "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
                "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "BuyMeAChai", //your business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                "prefile": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
          } catch (error) {
            console.log("error after initiation: ",error);
          }
      }

      return (
          <>
          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
          <ToastContainer/>
          <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
          <div className="cover bg-cover">
          <img src={currUser.coverpic} className="h-[50vh] w-full object-cover absolute" alt="Cover Image" />
          <div className="profilePic flex justify-center items-end h-[60vh] ">
        <img src={currUser.profilepic} className="w-32 h-32 object-cover rounded-full z-10" alt="Profile" />

        </div>
        </div> 
        <div className="intro flex flex-col items-center my-2 max-md:mx-5">
          <h2 className='font-bold text-2xl mt-0 mb-1'>@{username}</h2>
          <p className='text-center' >let&apos;s help {username} to raise funds</p>
          <div className='flex items-center gap-3 font-semibold  my-1 '>{payment.length} Payments  <div className='rounded-full bg-white w-2 h-2'></div>₹{(payment.reduce((a,b)=>a+b.amount,0))} raised</div>
        </div>
        <div className="payment md:w-[80vw] flex mx-auto gap-5 my-20 relative max-md:flex-col max-md:mx-7 ">
          <div className="support md:w-[50%]   bg-slate-900 py-7 px-8 ">
              <h2 className='text-xl font-semibold '> Supporters</h2>
              <ul className="list flex flex-col gap-4 my-5 ">
              {payment.length==0 && <li>No Payments yet</li>}
              {payment.map((p,i)=>{
                return <li key={i} className='text-xs flex list-none gap-2 items-center '>
                    <div className='mr-[2px]'><img className='h-5 w-5 rounded-full' width={5} height={5} src="newuser.png" alt="not"  /></div>
                    <div className='flex'>{p.name} donated ₹{p.amount} with a message &quot;{p.message}&quot;</div>
                  </li>
              })}
              </ul>
          </div>
          <div className="makepayment md:w-1/2 bg-slate-900 ">
            <h2 className='font-bold mx-14  mt-6 text-xl'>Make a Payment</h2>
              <form className="max-w-sm mx-auto mt-5 max-md:mx-7">
                <div className="mb-3">
                  <input onChange={handleChange} name='name' value={paymentform.name} type='text' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Name" required />
                </div>
                <div className="mb-3">
                  <input onChange={handleChange} name='message' value={paymentform.message} type='text' id="message" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter message" required />
                </div>
                <div className="mb-3">
                  <input onChange={handleChange} name='amount' value={paymentform.amount} type='text' id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Amount" required />
                </div>
              </form>
              <button onClick={()=>{pay(paymentform.amount*100)}} disabled={!paymentform.name || !paymentform.message || !paymentform.amount || paymentform.name?.length<3 || paymentform.message?.length<3} className="disabled:bg-slate-600  focus:outline-none text-white bg-purple-900 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-800 w-[78%] mx-14 dark:hover:bg-purple-900 dark:focus:ring-purple-900">Pay</button>

      <div className='flex gap-3 my-5  mx-14'>
      <button onClick={()=>{pay(1000)}}  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>Pay ₹10</button>
      <button onClick={()=>{pay(2000)}} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>Pay ₹20</button>
      <button onClick={()=>{pay(3000)}} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  py-2 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>Pay ₹30</button>
      </div>
    </div>
    </div>
      </>
    )
  }

  export default Paymentpage
