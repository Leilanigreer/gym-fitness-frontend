
import logo from '../assets/Bigger_Get_in_Shape.png';

export function Footer() {
  return (
    <footer className="navbar fixed-bottom" style={{ backgroundColor: '#2D0A31' }}>
      <div className="container-fluid">
        <div className="row w-100 align-items-center justify-content-between">
          <div className="col-auto">
            <p className="mb-0 text-white">
              <small>Copyright © {new Date().getFullYear()} Leilani's imagination</small>
            </p>
          </div>
          <div className="col-auto">
            <div className="d-flex align-items-center gap-2">
              <img 
                src={logo} 
                alt="GIS Logo" 
                className="rounded"
                style={{ width: '20px', height: '20px' }} 
              />
              <small className="text-white">Get In Shape</small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}