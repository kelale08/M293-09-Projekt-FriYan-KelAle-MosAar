export function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">BizTrips</h3>
            <p className="text-sm text-gray-600">
              Streamline your business travel management with our comprehensive platform.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Trip Planning</li>
              <li>Expense Tracking</li>
              <li>Meeting Management</li>
              <li>Reporting</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Documentation</li>
              <li>API Reference</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Security</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 BizTrips. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
