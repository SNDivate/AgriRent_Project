export default function EquipmentCard({ equipment }) {
    return (
      <div>
        <h3>{equipment.name}</h3>
        <p>{equipment.description}</p>
        <p>Condition: {equipment.condition}</p>
        <p>Rental Price: ${equipment.rentalPrice}</p>
        <p>Available from: {new Date(equipment.availabilityDate).toLocaleDateString()}</p>
        <img src={equipment.image} alt={equipment.name} />
        <p>Owner: {equipment.ownerName}</p>
        <p>Contact: {equipment.contactNumber}</p>
      </div>
    )
  }