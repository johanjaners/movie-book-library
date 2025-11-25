import './HeroSection.css'

const HeroSection = ({ onBrowseClick }) => {
  return (
    <section className="hero-section">
      <div className="hero-section__background" />
      <div className="hero-section__content">
        <p className="hero-section__overline">Movie / Book Library</p>
        <h1 className="hero-section__heading">Track what you watch and read.</h1>
        <p className="hero-section__subtext">
          Organize your collection, rate your favorites, and never lose track of a great story.
        </p>
        <button className="btn btn-primary hero-section__button" onClick={onBrowseClick}>
          Browse library
        </button>
      </div>
    </section>
  )
}

export default HeroSection

