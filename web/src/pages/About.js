import "./About.css"

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1 className="about-title">About PetShielders</h1>
          <p className="about-subtitle">Our mission is to find loving homes for pets in need</p>
        </div>
      </div>

      <div className="container">
        <section className="about-section">
          <div className="about-content">
            <h2>Our Story</h2>
            <p>
              PetShielders was founded in 2025 by our group who saw a need for a better way to connect
              homeless pets with loving families. What started as a small local initiative has grown into a great online idea for
              network of shelters and foster homes, all working together to save animals and enrich human lives through
              adoption.
            </p>
            <p>
              Over the years, we aim to help thousands of pets find their forever homes. We believe that every animal
              deserves love, care, and respect, and we work tirelessly to ensure that each pet in our care receives the
              attention they need until they find their perfect match.
            </p>
          </div>
          <div className="about-image">
            <img src="p.jpg" alt="Petshielders volunteers with pets" />
          </div>
        </section>

        <section className="about-section reverse">
          <div className="about-content">
            <h2>Our Mission</h2>
            <p>
              At PetShielders, our mission is to end pet homelessness through adoption, education, and spay/neuter
              programs. We strive to create a world where every pet has a loving home and where people understand the
              importance of responsible pet ownership.
            </p>
            <p>
              We believe in treating each animal as an individual, understanding their unique needs, and finding them
              homes where they will thrive. We also work to educate the public about animal welfare issues and provide
              resources to help people be the best pet parents they can be.
            </p>
          </div>
          <div className="about-image">
            <img
              src="p2.jpg"
              alt="Happy adopted pets with their families"
            />
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title">Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="owner.JPG" alt="Pranjal Prajapati" className="team-photo" />
              <h3>Pranjal Prajapati</h3>
              <p className="team-role">Backend Developer</p>
              <p className="team-bio">
                Pranjal has over 1.5 years of experience in animal welfare and is passionate about creating sustainable
                solutions to pet homelessness.
              </p>
            </div>
            <div className="team-member">
              <img src="webm.jpg" alt="Racheet Saraswat" className="team-photo" />
              <h3>Racheet Saraswat</h3>
              <p className="team-role">Frontend Developer</p>
              <p className="team-bio">
                Racheet oversees the day-to-day operations of our main Website facility and ensures all animals receive
                proper care.
              </p>
            </div>
           
           
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Pets Adopted</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">20+</div>
            <div className="stat-label">Volunteers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5</div>
            <div className="stat-label">Partner Shelters</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Weeks of Service</div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2 className="section-title">What Adopters Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "Adopting Max from PetShielders was the best decision we ever made. The process was smooth, and the
                  staff was incredibly helpful in finding us the perfect match for our family."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="https://via.placeholder.com/60x60?text=Sarah" alt="Sarah" className="author-photo" />
                <div>
                  <h4>Sarah & Max</h4>
                  <p>Adopted 2 weeks ago</p>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "I was nervous about adopting a cat, but the team at PetShielders made it so easy. They matched me with
                  Luna, who has been the perfect companion. I couldn't imagine life without her now!"
                </p>
              </div>
              <div className="testimonial-author">
                <img src="https://via.placeholder.com/60x60?text=John" alt="John" className="author-photo" />
                <div>
                  <h4>John & Luna</h4>
                  <p>Adopted 1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About

