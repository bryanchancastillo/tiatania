
function Footer() {
    
    const hrStyle = {
        height: '1px'
    };

  return (
      <footer className="py-7 py-md-9 bg-black">
          <div className="container px-4">
              <div className="row gx-7">
                  <div className="col-sm-4">
                      <h5 className="text-xs text-primary">
                          Redes Sociales
                      </h5>
                      <div className="d-flex mb-6 mb-md-0 font-serif" >
                          <a className="text-secondary text-primary-hover d-block me-3" href="https://www.instagram.com/cabanastiatania/">
                              <i className="bi bi-instagram"></i>
                          </a>
                          <a className="text-secondary text-primary-hover d-block me-3" href="https://www.facebook.com/cabanastiatania">
                              <i className="bi bi-facebook"></i>
                          </a>
                          <a className="text-secondary text-primary-hover d-block me-3" href="https://api.whatsapp.com/send?phone=18498819396">
                              <i className="bi bi-whatsapp"></i>
                          </a>
                      </div>
                  </div>
                  <div className="col-sm-4">
                      <h5 className="text-xs text-primary">
                          Contactos
                      </h5>
                      <ul className="list-unstyled mb-6">
                          <li className="d-flex mb-2">
                              <a style={{ textDecoration: 'none' }} className="text-secondary text-primary-hover" href="https://www.google.com/maps/place/Caba%C3%B1as+Tia+Tania/@18.4242891,-69.9920031,15z/data=!4m6!3m5!1s0x8ea56107ec23aeef:0xf1982ccf3e5e2e21!8m2!3d18.4242891!4d-69.9920031!16s%2Fg%2F11c0rnbr8k?entry=ttu">
                                  <i className="bi bi-geo-alt-fill me-2 mt-2 fs-sm"></i>
                                  Autop. 30 de Mayo, Santo Domingo, Rep&uacute;blica Dominicana
                              </a>
                          </li>
                          <li className="d-flex mb-2">
                              <a style={{ textDecoration: 'none' }} className="text-secondary text-primary-hover" href="tel:+18095376122">
                                  <i className="bi bi-telephone-fill me-2 mt-2 fs-sm"></i>
                                  +1 809 537 6122
                              </a>
                          </li>
                      </ul>
                  </div>
                  <div className="col-sm-4">
                      <h5 className="text-xs text-primary">
                          Horarios
                      </h5>
                      <div className="mb-3">
                          <div className="text-xs">Lunes - Domingo</div>
                          <div className="font-serif">24/7</div>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-12">
                      <div className="d-flex align-items-center">
                          <hr className="hr-sm me-3" style={hrStyle} /> &copy; 2024 Tia Tania. All rights reserved.
                      </div>
                  </div>
              </div>
          </div>
      </footer>
  );
}

export default Footer;