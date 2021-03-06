<script>
  import Header from "@/common/Header";
</script>

<style lang="scss">
  .content {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-color: rgb(237, 237, 237) #151515;

    .subcontent {
      max-width: 600px;
      margin: 0 auto;
      padding-bottom: 5vw;
    }
  }

  .padder {
    padding-top: 60px;
  }

  a {
    color: white;
  }

  img,
  video {
    max-width: 100%;
  }

  li {
    margin: 9px 0;
  }

  hr {
    margin: 30px 0;
  }

  .gallery {
    img {
      max-height: 400px;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
</style>

<div class="content">
  <Header />

  <div class="subcontent">
    <div class="padder" />

    <h1>About</h1>

    <p>
      “I was sitting near the campfire wondering about the stars. Slowly a
      thought came: The stars are flame, I thought. Then I had another thought:
      The stars are campfires that other hunterfolk light at night. The stars
      give a smaller light than campfires. So the stars must be campfires very
      far away.” — Carl Sagan,
      <a target="_blank" href="https://www.youtube.com/watch?v=FT_nzxtgXEw">
        Cosmos
      </a>
      .
    </p>

    <p>
      The early humans may not have been far wrong about the stars. We have
      discovered more than 4000 planets around stars other than our Sun
      (exoplanets), and we are rapidly discovering more. Browse planet gallery
      to see real images of all the exoplanets we have discovered so far! What
      you will see is a vignette of the sky around the star hosting the
      exoplanet.
    </p>

    <p>
      It’s possible that some of these planets harbour life. Which one do you
      think?
    </p>

    <img src="/img/galaxy.jpg" alt="Plotter drawing of whirlpool galaxy" />

    <p>
      Finding exoplanets is hard. Most of the planets listed here have been
      discovered with one of these four methods:
    </p>

    <ul>
      <li>
        <a target="_blank" href="https://arxiv.org/abs/1803.07867">Transit</a>
        — The exoplanet’s orbit takes it crosses directly in front of its host
        star from our point of view on Earth. When the exoplanet crosses its
        star, it blocks some of the light and with optical telescopes we can see
        this drop in the stars brightness. If we see a star’s brightness
        periodically decrease then there is a good chance we have found a
        planet!
      </li>

      <li>
        <a target="_blank" href="https://arxiv.org/abs/1707.07983">
          Radial velocity
        </a>
        — “For every action there is an equal and opposite reaction” — Newton’s
        third law of motion. The host star exerts a gravitational pull on its
        exoplanet, so the exoplanet pulls back. This gravitational force from
        the exoplanet jiggles the star around. When the star moves parallel to
        our line of sight, we can measure its velocity through spectroscopy. The
        host star’s spectrum changes due to the Doppler shift. If we see a star
        moving back and forth periodically it is possible it hosts an exoplanet.
      </li>

      <li>
        <a
          target="_blank"
          href="http://www.astronomy.ohio-state.edu/~microfun/Papers/Christie_SAS2006.pdf">
          Microlensing
        </a>
        — Gravity bends light. If a star happens to cross directly in front of
        another star, it acts as a lens. We can observe these lensing events
        with optical telescopes. It turns out the lensing pattern is very
        sensitive to exoplanets around the lensing star.
      </li>

      <li>
        <a target="_blank" href="https://arxiv.org/abs/1607.02525">
          Direct Imaging
        </a>
        — This technique is the most basic but perhaps the hardest. The
        exoplanet is directly imaged with a telescope by blocking out the host
        star’s light with a filter (coronagraph).
      </li>
    </ul>

    <p>
      Each of these methods is sensitive to different planet masses and orbital
      radii. The remaining few planets were discovered using exotic techniques
      like
      <a
        target="_blank"
        href="https://science.sciencemag.org/content/264/5158/538">
        pulsar timing
      </a>
      (there are planets that orbit neutron stars!).
      <a
        target="_blank"
        href="https://exoplanets.nasa.gov/alien-worlds/ways-to-find-a-planet/">
        NASA
      </a>
      has nice visualisations of each of these methods.
    </p>

    <p>
      We display each exoplanet as a contour plot of its surrounding starfield.
      The star in the center of the image hosts the exoplanet (note: a few of
      the closer exoplanet host stars may not be exactly in the middle of the
      frame because the stars move). The contours represent brightness linearly,
      Every contour you cross increases the measured brightness by a fixed
      amount. The sharp four corners you see in some bright stars are
      diffraction patterns generated by the telescope. We use contours so we can
      plot the star fields using a plotter printer:
    </p>

    <video width="360" height="640" controls>
      <source src="/img/plotter.mp4" type="video/mp4" />
    </video>

    <p>
      We also like to plot some of our favourite galaxies and black holes using
      a
      <a target="_blank" href="http://www.hpmuseum.net/display_item.php?hw=73">
        HP-7470A
      </a>
      plotter printer.
    </p>

    <div class="gallery">
      <img src="/img/plot1.jpg" alt="Kepler-367b" />
      <img src="/img/plot2.jpg" alt="Sombrero" />
      <img src="/img/plot3.jpg" alt="Cygnus X-1" />
      <img src="/img/plot4.jpg" alt="Black Eye" />
    </div>

    <!-- ##If you are interested in a plot of your favourite planet, let us know! We give 10% of our proceeds to the <a target="_blank" href=“url”>Keck telescope fund<\a> to help discover more planets. -->

    <p>
      One day we hope to curate a physical gallery of exoplanets. Perhaps the
      Earth features in an equivalent gallery on another planet…
    </p>
    <hr />

    <p>PLANET GALLERY</p>

    <p>
      Planet gallery is a collaboration between
      <a target="_blank" href="https://dylanfreedman.com/">Dylan Freedman</a>
      and
      <a target="_blank" href="https://www.alpeirson.com/">Lawrence Peirson</a>
      . Planet data is from the open source
      <a target="_blank" href="https://exoplanetarchive.ipac.caltech.edu/">
        NASA exoplanet archive
      </a>
      .
    </p>
  </div>
</div>
