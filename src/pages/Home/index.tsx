function Home(){
  return(
    <div>{new Array(100).fill(0).map((item,index)=>{
      return (
        <div key={index}>Content</div>
      )
    })}1111</div>
  )
}
export default Home