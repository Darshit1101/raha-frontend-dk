import badlavbg from "../assets/badlavbg.png";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";

const Badlav = () => {
  return (
    <div className="w-full">
      {/* Hero Section with Background Image */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${badlavbg})` }}
      >
        <div className="absolute inset-0  flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            #BADLAV Movement
          </h1>
          <p className="max-w-2xl">
            From Harmful to Herbal. Make the Change! Join thousands of people on
            their journey to natural beauty and wellness.
          </p>
        </div>
      </div>

      {/* What is the #BADLAV Movement Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          What is the #BADLAV Movement?
        </h2>

        <div className="space-y-6">
          <p>
            #BADLAV (meaning 'change' in Hindi) is more than just a hashtag—it's
            a movement encouraging people to make the switch from harmful
            chemical products to natural, Ayurvedic alternatives.
          </p>

          <p>
            Founded by Dr. Rachana and Hardik Dhola, this movement aims to raise
            awareness about the harmful effects of chemical-laden beauty
            products and promote the time-tested benefits of Ayurvedic
            ingredients.
          </p>

          <p>
            Every time you choose natural over chemical, you're not just making
            a better choice for yourself, but also for the environment and
            future generations. That's the essence of #BADLAV.
          </p>
        </div>
      </div>

      {/* Transformation Journeys Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Transformation Journeys
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Priya's Journey */}
          <div className="flex flex-col">
            <div className=" overflow-hidden mb-4">
              <img
                src={t1}
                alt="Priya Sharma's hair transformation"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium">Priya Sharma</h3>
                <span className="text-gray-500 text-sm">Mumbai</span>
              </div>
              <p className="text-sm text-justify">
                "After struggling with hair fall for years, I tried countless
                chemical products with temporary results. Switching to Raha's
                Hair Oil changed everything. Within 3 months, my hair fall
                reduced by 70% and I've gained new hair growth I never thought
                possible!"
              </p>
            </div>
          </div>

          {/* Rahul's Journey */}
          <div className="flex flex-col">
            <div className=" overflow-hidden mb-4">
              <img
                src={t2}
                alt="Rahul Mehta's beard transformation"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium">Rahul Mehta</h3>
                <span className="text-gray-500 text-sm">Delhi</span>
              </div>
              <p className="text-sm text-justify">
                "Dandruff and an itchy scalp were my constant companions until I
                discovered Raha's Nourishing Shampoo. The natural ingredients
                soothed my scalp immediately, and after consistent use my
                dandruff is completely gone. My confidence has never been
                stronger!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badlav;
