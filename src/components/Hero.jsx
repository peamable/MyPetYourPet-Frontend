import heroimage from "../assets/heroimage.png";
const Header = () => {
  return (
<section className="hero">
  <div className="horizontalContainer">
    <div className="hero-left">
      <h1 className="hero-title">
        Find a furry friend<br/>for the moments<br/>that matter
      </h1>
      <button className="btn btn-primary">Find A Pet</button>
    </div>
    <div className="hero-right">
      <img src={heroimage} alt="woman with dog" />
    </div>
  </div>
</section>)
}