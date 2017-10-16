'use strict'
// At the moment, there is no data for reviews

const faker = require('faker'),
  Promise = require('bluebird'),
  db = require('./server/db'),
  models = db.models,
  numProducts = 15,
  numUsers = 15,
  Categories = ['Cool Stuff', 'Electronics', 'Clothing', 'Accessories']

function doTimes (n, fn) {
  var results = []
  while (n--) results.push(fn(n))
  return results
}

function randUser (n) {
  return models.User.build({
    name: faker.name.findName(),
    password: faker.internet.password(),
    imgUrl: faker.internet.avatar(),
    email: faker.internet.email(),
    isAdmin: false,
    phone: faker.phone.phoneNumber(),
    shipAddress: faker.address.streetAddress(),
    shipCity: faker.address.city(),
    shipState: faker.address.state(),
    shipZip: faker.address.zipCode()
  })
}

function randProduct (n) {
  return Promise.map(
    Array(...Array(faker.random.number(2) + 1)).map(
      (cv, i, arr) => arr.length - i
    ),
    catId => models.Category.findById(catId)
  ).then(categories => {
    return models.Product
      .create({
        title: `${faker.commerce.productName()} Model ${faker.random.number(
          2999
        )}`,
        description: faker.company.bs(),
        price: faker.commerce.price(),
        inventory: 1000 + faker.random.number(19999),
        imgUrls: [faker.image.cats()]
      })
      .then(product => product.setCategories(categories))
  })
}

function randCart (n) {
  let userId = n + 1
  return models.Order.create({userId, address: 'Fullstack 25th Fl, NY'})
    .then(cart => {
      return Promise.map(
        Array(...Array(faker.random.number(3) + 1))
        .map(elem => faker.random.number(numProducts - 1) + 1),
        productId => cart.addProdToCart(productId, faker.random.number(10) + 1)
      )
    })
    .then(() => models.Order.getCartByUserId(userId))
}

function generateUsers () {
  var users = doTimes(numUsers, randUser)
  users.unshift(
    models.User.build({
      name: 'AJ Frank',
      password: 'password',
      imgUrl:
        'https://sendgrid.com/wp-content/uploads/2017/07/Headshot-178x178.jpg',
      email: 'alexanderjfrank@gmail.com',
      isAdmin: true
    })
  )

  users.unshift(
    models.User.build({
      name: 'Vince Rios',
      password: 'password',
      imgUrl: faker.internet.avatar(),
      email: 'vince@riversconsulting.com',
      isAdmin: true
    })
  )

  users.unshift(
    models.User.build({
      name: 'D Fan',
      password: 'password',
      imgUrl: faker.internet.avatar(),
      email: 'dfan@graceshopper.com',
      isAdmin: true
    })
  )

  return users
}

const
  generateProducts = () => doTimes(numProducts, randProduct),
  generateCategories = () => Categories.map(cat => models.Category.build({ name: cat })),
  generateOrders = () => doTimes(numUsers + 3, randCart),
  createUsers = () => Promise.map(generateUsers(), user => user.save()),
  createCategories = () => Promise.map(generateCategories(), category => category.save()),
  createProducts = () => Promise.all(generateProducts()),
  createCarts = () => Promise.all(generateOrders()),
  createOrders = () => Promise.map(generateOrders(), cart => cart.submit())

const guitars = () => {
  let categories
  return Promise.all([
    models.Category.create({ name: 'Electric Guitars' }),
    models.Category.create({ name: 'Acoustic Guitars' }),
    models.Category.create({ name: 'Guitar Amps' }),
    models.Category.create({ name: 'Synthesizers' }),
    models.Category.create({ name: 'Pianos' }),
    models.Category.create({ name: 'Violin Family' })
  ])
    .then(_categories => {
      categories = _categories
      return Promise.all([
        models.Product.create({
          description:
            'This simple, elegant semi-hollow features 57 Classic and Super 57 Classic pickups with matched bobbin windings for vintage humbucker tone with enhanced highs. Appointments include a great-feeling C neck profile with torrified maple fretboard, an improved truss rod, rolled neck binding, low-profile frets, Grover tuners and locking stopbar tailpiece for better sustain. Includes hardshell case.',
          title: 'Gibson ES-339 Studio Semi-Hollow Guitar Ginger Burst',
          price: 1799.0,
          inventory: 3,
          imgUrls: [
            'Gibson_2016_ES-339_1.png',
            'Gibson_2016_ES-339_2.png',
            'Gibson_2016_ES-339_3.png',
            'Gibson_2016_ES-339_4.png',
            'Gibson_2016_ES-339_5.png'
          ]
        }),
        models.Product.create({
          description:
            'This simple, elegant semi-hollow features 57 Classic and Super 57 Classic pickups with matched bobbin windings for vintage humbucker tone with enhanced highs. Appointments include a great-feeling C neck profile with torrified maple fretboard, an improved truss rod, rolled neck binding, low-profile frets, Grover tuners and locking stopbar tailpiece for better sustain. Includes hardshell case.',
          title: 'Gibson 2016 ES-335 Studio Semi-Hollow Electric Guitar Faded Cherry',
          price: 1799.0,
          inventory: 1,
          imgUrls: [
            'Gibson_2016_ES-335_1.png',
            'Gibson_2016_ES-335_2.png',
            'Gibson_2016_ES-335_3.png',
            'Gibson_2016_ES-335_4.png',
            'Gibson_2016_ES-335_5.png',
            'Gibson_2016_ES-335_6.png',
            'Gibson_2016_ES-335_7.png'
          ]
        }),
        models.Product.create({
          description:
            'The L-4 was developed as a louder, bolder update of Gibson popular L-1 and L-3 designs, advertised as a grand concert size model with 20 frets, one more than its predecessors. Over time the humbuckers proved the most versatile and practical, and thus today graceful mahogany L-4 CES model reached maturity.',
          title: 'Gibson L-4 CES Mahogany Hollowbody Electric Guitar Wine Red',
          price: 6499.0,
          inventory: 1,
          imgUrls: [
            'Gibson_L-4_CES_M_1.png',
            'Gibson_L-4_CES_M_2.png',
            'Gibson_L-4_CES_M_3.png',
            'Gibson_L-4_CES_M_4.png',
            'Gibson_L-4_CES_M_5.png',
            'Gibson_L-4_CES_M_6.png',
            'Gibson_L-4_CES_M_7.png'
          ]
        }),
        models.Product.create({
          description:
            'The Martin Performing Artist Series Custom GPCPA5 Grand Performance Acoustic-Electric Guitar combines that world-famous Martin sound with the contemporary playability of an electric guitar. Its unique body design blends a tight waist with a deep body. The end result is a tone that is well-defined, plus a massive amount of power and projection. Its solid Sitka spruce top is braced perfectly to give you a rich, full-bodied tone that is versatile enough for any musical situation. The body is rounded out with forest-friendly rosewood HPL back and sides to give you an attractive visual look.',
          title:
            'Martin Performing Artist Series Custom GPCPA5 Grand Performance Acoustic-Electric Guitar Natural',
          price: 699.0,
          inventory: 5,
          imgUrls: [
            'Martin_Artist_Custom_GPCPA5_1.png',
            'Martin_Artist_Custom_GPCPA5_2.png',
            'Martin_Artist_Custom_GPCPA5_3.png',
            'Martin_Artist_Custom_GPCPA5_4.png',
            'Martin_Artist_Custom_GPCPA5_5.png',
            'Martin_Artist_Custom_GPCPA5_6.png'
          ]
        }),
        models.Product.create({
          description:
            'Designed with electric players in mind, the T5z brings more of an electric guitar look and feel to the popular hollowbody hybrid electric-acoustic T5 series. Electric-friendly features include a more compact body than the original T5, plus a 12-inch fretboard radius and jumbo frets that making bending strings easier. If you are looking for a versatile stage or recording guitar that blends the feel of an electric with a full range of acoustic and electric tones, the T5z gives you an essential musical tool.',
          title: 'Taylor T5z Pro Acoustic-Electric Guitar',
          price: 2699.0,
          inventory: 7,
          imgUrls: [
            'Taylor_T5z_Pro_Acoustic-Electric_Guitar_1.png',
            'Taylor_T5z_Pro_Acoustic-Electric_Guitar_2.png',
            'Taylor_T5z_Pro_Acoustic-Electric_Guitar_3.png',
            'Taylor_T5z_Pro_Acoustic-Electric_Guitar_4.png',
            'Taylor_T5z_Pro_Acoustic-Electric_Guitar_5.png',
            'Taylor_T5z_Pro_Acoustic-Electric_Guitar_6.png'
          ]
        }),
        models.Product.create({
          description:
            'The Korg Kronos is the flagship keyboard of Korgs synthesizer line. It is available in three configurations, each with the same phenomenal performance, production and synthesis capacity. The only difference between the three models is the key bed. This is the full 88-key version, equipped with Korgs RH-3 (Real Weighted Hammer Action 3) keyboard, one of the professional keyboard industrys best-loved piano touches. It is the same keyboard used on Korgs upper-end piano models and on the Korg SV-1. The hammer weighting is graded, providing a heavier feel in the lower register and a lighter feel in the upper register, just as on a grand piano, offering superb playability.',
          title:
            'Korg New Kronos 88-Key Piano, Synthesizer & Music Workstation',
          price: 3699.0,
          inventory: 3,
          imgUrls: [
            'Korg_New_Kronos_88_1.png',
            'Korg_New_Kronos_88_2.png',
            'Korg_New_Kronos_88_3.png',
            'Korg_New_Kronos_88_4.png',
            'Korg_New_Kronos_88_5.png',
            'Korg_New_Kronos_88_6.png'
          ]
        }),
        models.Product.create({
          description:
            'Rolands JUNO synths are known everywhere for their great sound, ease of use, and exceptional value. Beginning in the 70s with some of the earliest mass-produced analog synthesizers, the Juno lines new releases are always hotly anticipated. The JUNO-DS88 takes the iconic series to a new level of performance, adding many powerful enhancements while still keeping operation streamlined and simple. Equipped with 88 weighted-action keys for a premium feel, the versatile, intuitive JUNO-DS88 puts you in creative command, making it easy to produce exceptional music everywhere you play.',
          title: 'Roland JUNO-DS88 Piano & Synthesizer',
          price: 1000.0,
          inventory: 6,
          imgUrls: [
            'Roland_JUNO-DS88_5.png',
            'Roland_JUNO-DS88_2.png',
            'Roland_JUNO-DS88_3.png',
            'Roland_JUNO-DS88_4.png',
            'Roland_JUNO-DS88_1.png'
          ]
        }),
        models.Product.create({
          description:
            'With the size of a combo, but sporting two 12" 60-watt Celestion Vintage 30 speakers, this compact-sized PPC212-OB speaker cabinet from the Orange PPC series features an open-back design and is the same size as the Rockerverb 50C and AD30TC. The Orange speaker cab features a power handling of 120 watts, producing sizzling guitar tone that is unmistakably Orange. ',
          title:
            'Orange Amplifiers PPC Series PPC212OB 120W 2x12 Open Back Guitar Speaker Cab',
          price: 599.0,
          inventory: 10,
          imgUrls: [
            'Orange_Amplifiers_PPC212OB_1.png',
            'Orange_Amplifiers_PPC212OB_2.png',
            'Orange_Amplifiers_PPC212OB_3.png'
          ]
        }),
        models.Product.create({
          description: 'This ingenious blend of tradition and innovation is perfectly executed by the team at Gibson Memphis. Combining characteristics of a Les Paul and ES-335 it yields surprisingly powerful tones and a wonderful playing experience, courtesy of PAF-style MHS Alnico II (lead) and MHS Alnico III (rhythm) pickups, rounded C neck profile, historic details and more. Other features include F-hole emblem engraved truss rod cover, redesigned neck dimensions, bone nut, rolled neck binding, low-profile frets, Kluson tuners and an ABR-1 bridge with stopbar tailpiece.  Includes hardshell case.',
          title: 'Gibson ES-Les Paul Semi-Hollow Body Electric Guitar Transparent Amber',
          price: 3284.0,
          inventory: 2,
          imgUrls: [
            'Gibson_ES-Les_Paul_Semi-Hollow_Body_1.png',
            'Gibson_ES-Les_Paul_Semi-Hollow_Body_2.png',
            'Gibson_ES-Les_Paul_Semi-Hollow_Body_3.png',
            'Gibson_ES-Les_Paul_Semi-Hollow_Body_4.png',
            'Gibson_ES-Les_Paul_Semi-Hollow_Body_5.png',
            'Gibson_ES-Les_Paul_Semi-Hollow_Body_6.png'
          ]
        }),
        models.Product.create({
          description: '',
          title: 'Gibson 2016 ES-335 Semi-Hollow Electric Guitar Faded Light Burst',
          price: 0,
          inventory: 0,
          imgUrls: [
            'Gibson_2016_ES-335_Semi-Hollow_Electric_1.png',
            'Gibson_2016_ES-335_Semi-Hollow_Electric_2.png',
            'Gibson_2016_ES-335_Semi-Hollow_Electric_3.png',
            'Gibson_2016_ES-335_Semi-Hollow_Electric_4.png',
            'Gibson_2016_ES-335_Semi-Hollow_Electric_5.png',
            'Gibson_2016_ES-335_Semi-Hollow_Electric_6.png'
          ]
        }),
        models.Product.create({
          description: 'Part of Martins successful Road Series, the 000RS1A is a great solid-wood Martin at an affordable price. Constructed with sapele and equipped with Fishman Sonitone electronics, this stage-ready Auditorium model produces the perfect blend of volume and balance. Hardshell case included.',
          title: 'Martin Road Series 000RS1 Auditorium Acoustic-Electric Guitar Natural',
          price: 759.0,
          inventory: 2,
          imgUrls: [
            'Martin_Road_Series_000RS1_Auditorium_1.png',
            'Martin_Road_Series_000RS1_Auditorium_2.png',
            'Martin_Road_Series_000RS1_Auditorium_3.png',
            'Martin_Road_Series_000RS1_Auditorium_4.png',
            'Martin_Road_Series_000RS1_Auditorium_5.png'
          ]
        }),
        models.Product.create({
          description: 'Travel-friendly and affordable, the FP-50 brings you top-class piano performance along with many other great features to enhance your playing enjoyment. At your fingers is the authentic tone and touch of an acoustic grand, plus a large selection of versatile sounds for performing in a variety of situations. The intelligent rhythm feature makes it simple to create incredible music, providing dynamic, sophisticated accompaniments that automatically follow your performances in real time. And with its compact, stylish design and built-in speaker system, the FP-50 is always ready to go wherever you want to play.',
          title: 'Roland FP-50 Digital Piano Black',
          price: 1299.0,
          inventory: 3,
          imgUrls: [
            'Roland_FP-50_Digital_Piano_Black_1.png'
          ]
        }),
        models.Product.create({
          description: 'Cordoba has chosen to honor four master luthiers whose work has shaped the history of the nylon string guitar over the past 150 years, inspiring generations of guitar builders. Each Master Series model is a replica of an iconic guitar representing significant moments in the careers of Antonio de Torres, Hermann Hauser I, Miguel Rodriguez, and Manuel Reyes. Handmade with premium materials in Cordobas California Workshop, Cordoba has partnered with Kenny Hill to examine the original guitars, poring over nuances and specifications to get inside the mind of each maker. From Torres signature 7-fan bracing and unique small body design, to Hausers famed 1937 model used by Andres Segovia, the Master Series allows todays players to get their hands on a slice of guitar history at a fraction of the cost. The Torres Classical Guitar features a solid Engelmann spruce, solid Indian rosewood back and sides, and Spanish cedar neck with an ebony fingerboard. Other appointments include an Indian rosewood binding and bridge, a rope design wood top purfling with 3-ply back and sides purfling (maple/ebony/maple), and an all-natural mosaic rope and herringbone marquetry rosette. It also comes with gold Gotoh tuners with ebony buttons and a hardshell Cordoba humidified archtop case.',
          title: 'Cordoba Torres Classical Guitar Natural',
          price: 3499.0,
          inventory: 1,
          imgUrls: [
            'Cordoba_Torres_Classical_Guitar_Natural_1.png',
            'Cordoba_Torres_Classical_Guitar_Natural_2.png',
            'Cordoba_Torres_Classical_Guitar_Natural_3.png',
            'Cordoba_Torres_Classical_Guitar_Natural_4.png',
            'Cordoba_Torres_Classical_Guitar_Natural_5.png',
            'Cordoba_Torres_Classical_Guitar_Natural_6.png'
          ]
        }),
        models.Product.create({
          description: 'Built to last, the Glasser carbon composite violin looks and sounds great. This unique design makes for an instrument with a wonderful tonal quality with durability most instruments will never match. Fully adjusted with Larsen strings, a Despiau bridge, Planetary Tuning Pegs, and a carbon composite Glasser tailpiece with 4 fine tuners.',
          title: 'Glasser Carbon Composite 4/4 Size Acoustic Violin',
          price: 544.0,
          inventory: 5,
          imgUrls: [
            'Glasser_Carbon_Composite_Acoustic_Violin_1.jpg',
            'Glasser_Carbon_Composite_Acoustic_Violin_2.jpg',
            'Glasser_Carbon_Composite_Acoustic_Violin_3.jpg',
            'Glasser_Carbon_Composite_Acoustic_Violin_4.jpg',
            'Glasser_Carbon_Composite_Acoustic_Violin_5.jpg',
            'Glasser_Carbon_Composite_Acoustic_Violin_6.jpg',
            'Glasser_Carbon_Composite_Acoustic_Violin_7.jpg',
            'Glasser_Carbon_Composite_Acoustic_Violin_8.jpg'
          ]
        }),
        models.Product.create({
          description: 'Nice sunburst on bound maple top, dark cherry finish on mahogany body and neck, bound rosewood fretboard, trapezoid inlays, 22 frets, 2 humbucking pickups, 4 pull pots change pickup phase and tap coils, stop tailpiece, ABR-1 tune-o-matic bridge, Grover Rotomatic tuners, gold hardware, J.P.s signature appears on original pickguard (included in case pocket), 1-11/16" nut, 24-3/4" scale, OHSC (J.P.s signature appears on the interior cape), EC, consignment (SN:92725452)',
          title: 'Gibson Jimmy Page Les Paul (1995)',
          price: 4250.0,
          inventory: 1,
          imgUrls: [
            'Gibson_Jimmy_Page_Les_Paul_1995_1.jpg',
            'Gibson_Jimmy_Page_Les_Paul_1995_6.jpg',
            'Gibson_Jimmy_Page_Les_Paul_1995_3.jpg',
            'Gibson_Jimmy_Page_Les_Paul_1995_4.jpg',
            'Gibson_Jimmy_Page_Les_Paul_1995_5.jpg',
            'Gibson_Jimmy_Page_Les_Paul_1995_2.jpg',
            'Gibson_Jimmy_Page_Les_Paul_1995_7.jpg'
          ]
        }),
        models.Product.create({
          description: 'Affordable travel fiddle makes it possible to play anywhere, worry-free. Design inspired by the 17th century Pochette, or Dance Masters Violin, sized to fit in a coat pocket. Hardwood neck, solid Adirondack Red Spruce top, flaxwood polymer/wood composite injection molded fingerboard, glass reinforced injection-molded thermoplastic body. Hard maple bridge, acrylic tailpiece and chin/shoulder rest (with 3-way height and angle adjustment). Grover 2B friction pegs with fine tuner on High E. ~23" long x ~4" wide. Includes pickup.',
          title: 'Magic Fluke Company Cricket Violin with Pickup',
          price: 458,
          inventory: 3,
          imgUrls: [
            'Magic_Fluke_Company_Cricket_Violin_1.jpg',
            'Magic_Fluke_Company_Cricket_Violin_2.jpg',
            'Magic_Fluke_Company_Cricket_Violin_3.jpg',
            'Magic_Fluke_Company_Cricket_Violin_4.jpg',
            'Magic_Fluke_Company_Cricket_Violin_5.jpg',
            'Magic_Fluke_Company_Cricket_Violin_6.jpg'
          ]
        }),
        models.Product.create({
          description: 'Williams redefines affordable elegance with the best-in-class Symphony Grand digital piano. This micro-grand style, 88-key, graded hammer-action instrument offers realistic sound and feel, complemented by a luxurious ebony gloss finish. The newly designed keybed provides an authentic response and playability. The Williams Custom Sound Library the Symphony Grand uses is designed around a wide collection of high-resolution instruments taken from a famed Italian grand piano, as well as vintage electric pianos and organs.',
          title: 'Williams Symphony Grand Digital Piano with Bench',
          price: 1499.0,
          inventory: 2,
          imgUrls: [
            'Williams_Symphony_Grand_Digital_Piano_1.png',
            'Williams_Symphony_Grand_Digital_Piano_2.png',
            'Williams_Symphony_Grand_Digital_Piano_3.png',
            'Williams_Symphony_Grand_Digital_Piano_4.png',
            'Williams_Symphony_Grand_Digital_Piano_5.png'
          ]
        }),
        models.Product.create({
          description: 'Iconic tone in a limited edition amazing design. In the pantheon of great amps, there are few that stand the test of time like the Fender Princeton and its signature clean tones. There’s that long, luscious spring reverb that lets players dial in everything from ethereal echoes to cavernous swirls. There’s that recognizable Princeton tremolo, which pulses with pure Fender character through every passage and performance. Clearly, its rich tone and responsiveness have given it an unmistakable voice. The relationship between classic Fender amps and Jensen speakers has long existed, and they"ve long been part of the recipe that results in those beloved tones. But true to its namesake, the switch from 10 in. to 12 in. speaker serves up a little something extra for tone chasers—crystal clear wine glass fidelity with plenty of low-end punch and attitude when cranked—a slight differentiation from the tonal quality of the famous Princeton. The Limited Edition Princeton 112 Bordeaux Reserve is a drool-worthy collectable for the discerning amp enthusiast seeking a cosmetically unique amp as well. Also in line with its moniker, the Bordeaux Reserve features a classy yet understated wine red textured vinyl covering and, paired with traditional wheat-colored grille cloth, offers an air of sophistication that only a Fender Princeton can exude.',
          title: 'Fender Limited Edition 65 Princeton Reverb 15W 1x12 Tube Guitar Combo Amp Bordeaux Reserve',
          price: 1100.0,
          inventory: 10,
          imgUrls: [
            'Fender_Limited_Edition_65_Princeton_Reverb_15W_1.png',
            'Fender_Limited_Edition_65_Princeton_Reverb_15W_2.png',
            'Fender_Limited_Edition_65_Princeton_Reverb_15W_3.png',
            'Fender_Limited_Edition_65_Princeton_Reverb_15W_4.png'
          ]
        }),
        models.Product.create({
          description: 'Vintage overdrive-soaked sounds for the stage and studio. The Marshall 1974X 18W 1x12 Combo Amp is a handwired reissue of the model 1974, a combo originally produced from 1965 to 1968. Introduced as a practice combo amp in 1965, it wasnt as loud as the terror-inducing heads Marshall was producing, but it could rock, giving up incredible lead and crunch sounds at low volumes. The 1974X combo comes with 2 EL84 tubes in the power amp, 3 ECC83s in the preamp, an EZ81 rectifier tube, and features valve-driven tremolo. A proprietary, aged reissue of the 20W, ceramic magnet Celestion T1221 speaker used in the original adds to the Marshall 1974Xs tonal authenticity. Marshall includes a footswitch with your 1974X Combo Amp.',
          title: 'Marshall 1974X Handwired 18W 1x12 Combo Amp',
          price: 2700.0,
          inventory: 7,
          imgUrls: [
            'Marshall_1974X_Combo_Amp_1.png',
            'Marshall_1974X_Combo_Amp_2.png',
            'Marshall_1974X_Combo_Amp_3.png',
            'Marshall_1974X_Combo_Amp_4.png',
            'Marshall_1974X_Combo_Amp_5.png'
          ]
        }),
        models.Product.create({
          description: 'The Fender 65 Twin Reverb Amp is an authentic all-tube reproduction of the original classic! It has earned a reputation of being one of the cleanest tube amps ever, but it delivers a taste of the trademark Fender crunch when cranked up high. Delivers 85W through two Jensen 12" speakers. It has two channels, tube vibrato, tube spring reverb, tilt-back legs and Blackface cosmetics. Includes two-button footswitch to control reverb and vibrato effects.',
          title: 'Fender Vintage Reissue 65 Twin Reverb 85W 2x12 Guitar Combo Amp',
          price: 1500,
          inventory: 5,
          imgUrls: [
            'Fender_Vintage_Reissue_65_Twin_Reverb_85W_Combo_Amp_1.png',
            'Fender_Vintage_Reissue_65_Twin_Reverb_85W_Combo_Amp_2.png',
            'Fender_Vintage_Reissue_65_Twin_Reverb_85W_Combo_Amp_3.png'
          ]
        })
      ])
    })
    .then(products => {
      return Promise.all([
        categories[0].addProducts(products[0]),
        categories[1].addProducts(products[0]),
        categories[0].addProducts(products[1]),
        categories[1].addProducts(products[1]),
        categories[0].addProducts(products[2]),
        categories[1].addProducts(products[2]),
        categories[0].addProducts(products[3]),
        categories[1].addProducts(products[3]),
        categories[0].addProducts(products[4]),
        categories[1].addProducts(products[4]),
        categories[3].addProducts(products[5]),
        categories[4].addProducts(products[5]),
        categories[3].addProducts(products[6]),
        categories[4].addProducts(products[6]),
        categories[2].addProducts(products[7]),
        categories[0].addProducts(products[8]),
        categories[1].addProducts(products[8]),
        categories[0].addProducts(products[9]),
        categories[1].addProducts(products[9]),
        categories[0].addProducts(products[10]),
        categories[1].addProducts(products[10]),
        categories[4].addProducts(products[11]),
        categories[1].addProducts(products[12]),
        categories[5].addProducts(products[13]),
        categories[0].addProducts(products[14]),
        categories[5].addProducts(products[15]),
        categories[4].addProducts(products[16]),
        categories[2].addProducts(products[17]),
        categories[2].addProducts(products[18]),
        categories[2].addProducts(products[19]),
        models.Review.create({ title: 'Description very far from the truth', body: 'The description is wrong, check out Gibson website. Correctly it has a maple neck not mahagony, 57 classic and Super 57 pickups not Burstbuckers, Torrified maple neck and a Corian nut not bone.', rating: 5, productId: products[0].id, userId: 1 }),
        models.Review.create({ title: 'Good bargain with the usual Gibson flaws', body: 'For me, this is the best 335 available from Gibson today. Every Gibson guitar has the same issues 1.the strings binding in the nut creating tuning instability and 2.the headstock breaking off if the guitar gets an impact there. Gibson simply wont fix these very basic issues because it is not being true to the original Gibson guitars of the 50s and 60s.....But there is value here. The neck plays like a dream, better than any of my other guitars. It just feels right and its extremely easy to fret. I set mine up with 10s and dont suggest using anything lighter. The pickups sound great and now that Gibson gave us all four knobs on the Studio version, the range of tones matches that from the more expensive 335s. Honestly, I dont see any reason to spend more. This guitar looks great with its translucent finish and black binding, I have the red one, and the other 335s will have the same issues that this less expensive model has.', rating: 4, productId: products[1].id, userId: 2 }),
        models.Review.create({ title: 'oh yeah that sweet tone you can only get with a Gibson', body: 'Yes, I would recommend this to a friend', rating: 5, productId: products[1].id, userId: 3 }),
        models.Review.create({ title: 'Disappointment', body: 'I can not believe that Gibson let that guitar out of the factory. The neck buzzed all the way to the top and I was not sure that adjustment would help. There were three major blemishes in the finish that could not be easily fixed.  Ordered an Ibanez which is back ordered.', rating: 1, productId: products[1].id, userId: 4 }),
        models.Review.create({ title: 'Its a reality', body: 'Gibson stepped it up a notch.', rating: 5, productId: products[1].id, userId: 5 }),
        models.Review.create({ title: 'a glorious instrument!!!', body: 'More than a guitar, this instrument is an heirloom quality work of art, that youll treasure forever. The sound is rich and toneful like no other guitar. Im a Gibson fanatic, and this is as good as it gets. I love all my Gibsons, but this model is the ultimate. I love the wine red color the best, although the natural, and sunbursts are gorgeous too.', rating: 5, productId: products[2].id, userId: 7 }),
        models.Review.create({ title: 'I would buy this beautiful guitar again!', body: 'Purchase was handled professionally, and follow-up was excellent', rating: 5, productId: products[2].id, userId: 8 })        
      ])
    })
}

const reviews = () => {
  return Promise.all([
    models.Review.create({ title: 'I', body: 'excellent', rating: 5, productId: products[2].id, userId: 8 }),
  ])
}

const seed = () =>
  createUsers()
    .then(() => createCategories())
    .then(() => createProducts())
    .then(() => createCarts())
    .then(() => createOrders())
    .then(() => guitars())
    // .then(() => reviews())
    .catch(console.log)

console.log('Syncing database')

module.exports = () => db
  .sync({ force: true })
  .then(() => {
    console.log('Seeding database')
    return seed()
  })
  .then(() => {
    console.log('Seeding successful')
  })
  .catch(err => {
    console.error('Error while seeding')
    console.error(err.errors)
  })
