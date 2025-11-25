import './HeroSection.css'

const HeroSection = ({ onBrowseClick }) => {
  return (
    <section className="hero">
      <div className="hero__background" />
      <div className="hero__gradient-overlay" />
      <div className="hero__content container">
        <p className="hero__overline">Movie / Book Library</p>
        <h1 className="hero__heading">Track what you watch and read.</h1>
        <p className="hero__subtext">
          Organize your collection, rate your favorites, and never lose track of a great story.
        </p>
        <button className="btn btn-primary hero__button" onClick={onBrowseClick}>
          Browse library
        </button>
      </div>
    </section>
  )
}

export default HeroSection

