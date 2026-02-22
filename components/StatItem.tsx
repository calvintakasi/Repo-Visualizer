export const StatItem = ({ label, value, icon }: any) => (
  <div className="text-sm">
    <span className="mr-1">{icon}</span>
    <span className="font-semibold">{value}</span>
    <span className="ml-1 text-gray-500">{label}</span>
  </div>
);