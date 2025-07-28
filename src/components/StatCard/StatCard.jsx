// src/components/StatCard/StatCard.jsx
import './StatCard.css';

/**
 * A reusable card component to display a key statistic with an icon.
 * @param {object} props - The component's properties.
 * @param {React.ReactNode} props.icon - The icon element to display.
 * @param {string} props.value - The statistic value (e.g., "2,000").
 * @param {string} props.label - The label for the statistic (e.g., "Total Patients").
 * @param {string} props.color - The color theme ('primary', 'secondary', 'danger', 'success').
 */
function StatCard({ icon, value, label, color }) {
    // Combines the base class with the color prop to create a dynamic class name
    const cardClassName = `stat-card ${color || ''}`;

    return (
        <div className={cardClassName}>
            <div className="stat-card-icon">
                {icon}
            </div>
            <div className="stat-card-info">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
            </div>
        </div>
    );
}

export default StatCard;