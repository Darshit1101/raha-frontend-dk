import q1 from "../assets/q1.svg";
import q2 from "../assets/q2.svg";
import q3 from "../assets/q3.svg";
import q4 from "../assets/q4.svg";

const QualityItem = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col  items-center text-center">
      <div className="bg-[#7f614f] rounded-full w-16 h-16 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-sm leading-relaxed max-w-xs">{description}</p>
    </div>
  );
};

const Quality = () => {
  const qualityItems = [
    {
      icon: <img src={q1} />,
      title: "Ayurvedic Formulas",
      description:
        "Ancient wisdom meets modern science in our carefully crafted formulations.",
    },
    {
      icon: <img src={q2} />,
      title: "Dermatologically Tested",
      description:
        "All products are rigorously tested to ensure safety and efficacy.",
    },
    {
      icon: <img src={q3} />,
      title: "100% Natural",
      description:
        "No sulfates, parabens, or harmful chemicals in any of our products.",
    },
    {
      icon: <img src={q4} />,
      title: "Cruelty-Free",
      description:
        "We never test on animals and are committed to ethical practices.",
    },
  ];

  return (
    <section className="bg-[#f6f3f0] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-8">
          {qualityItems.map((item, index) => (
            <QualityItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quality;
