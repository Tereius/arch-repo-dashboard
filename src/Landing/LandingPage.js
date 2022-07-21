export function LandingPage() {
  return (
    <div className="card bg-light mb-3">
      <div className="card-header">Header</div>
      <div className="card-body">
        <h5 className="card-title">Secondary card title</h5>
        <p className="card-text">
          <pre>
            <code>{window.location.href}</code>
          </pre>
        </p>
      </div>
    </div>
  );
}
