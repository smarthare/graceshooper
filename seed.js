'use strict'
const db = require( './server/db' );
const models = db.models

const seed = () => {
  let categories;
  const promiseArr = [
    models.Category.create({ name: 'Electric Guitars' }),
    models.Category.create({ name: 'Acoustic Guitars' }),
    models.Category.create({ name: 'Guitar Amps' }),
    models.Category.create({ name: 'Synthesizers' }),
    models.Category.create({ name: 'Pianos' }),
    models.Category.create({ name: 'Violin Family' })
  ];
  Promise.all(promiseArr)
    .then(_categories => {
      categories = _categories;
      const promiseArr = [
        models.Product.create({ description: 'This simple, elegant semi-hollow features 57 Classic and Super 57 Classic pickups with matched bobbin windings for vintage humbucker tone with enhanced highs. Appointments include a great-feeling C neck profile with torrified maple fretboard, an improved truss rod, rolled neck binding, low-profile frets, Grover tuners and locking stopbar tailpiece for better sustain. Includes hardshell case.',
        name: 'Gibson ES-339 Studio Semi-Hollow Guitar', price: 1799.00, inventory: 3, imgURLs: ['Gibson_ES-339_1.png', 'Gibson_ES-339_2.png', 'Gibson_ES-339_3.png', 'Gibson_ES-339_4.png', 'Gibson_ES-339_5.png'] }),
        models.Product.create({ description: 'This simple, elegant semi-hollow features 57 Classic and Super 57 Classic pickups with matched bobbin windings for vintage humbucker tone with enhanced highs. Appointments include a great-feeling C neck profile with torrified maple fretboard, an improved truss rod, rolled neck binding, low-profile frets, Grover tuners and locking stopbar tailpiece for better sustain. Includes hardshell case.',
        name: 'Gibson 2016 ES-335 Studio Semi-Hollow Electric Guitar', price: 1799.00, inventory: 1, imgURLs: ['Gibson_2016_ES-335_1', 'Gibson_2016_ES-335_2', 'Gibson_2016_ES-335_3', 'Gibson_2016_ES-335_4', 'Gibson_2016_ES-335_5', 'Gibson_2016_ES-335_6', 'Gibson_2016_ES-335_7'] }),
        models.Product.create({ description: 'The L-4 was developed as a louder, bolder update of Gibson popular L-1 and L-3 designs, advertised as a grand concert size model with 20 frets, one more than its predecessors. Over time the humbuckers proved the most versatile and practical, and thus today graceful mahogany L-4 CES model reached maturity.',
        name: 'Gibson L-4 CES Mahogany Hollowbody Electric Guitar Wine Red', price: 6499.00, inventory: 1, imgURLs: ['Gibson_L-4_CES_Mahogany_1', 'Gibson_L-4_CES_Mahogany_2', 'Gibson_L-4_CES_Mahogany_3', 'Gibson_L-4_CES_Mahogany_4', 'Gibson_L-4_CES_Mahogany_5', 'Gibson_L-4_CES_Mahogany_6', 'Gibson_L-4_CES_Mahogany_7'] }),
        models.Product.create({ description: 'The Martin Performing Artist Series Custom GPCPA5 Grand Performance Acoustic-Electric Guitar combines that world-famous Martin sound with the contemporary playability of an electric guitar. Its unique body design blends a tight waist with a deep body. The end result is a tone that is well-defined, plus a massive amount of power and projection. Its solid Sitka spruce top is braced perfectly to give you a rich, full-bodied tone that is versatile enough for any musical situation. The body is rounded out with forest-friendly rosewood HPL back and sides to give you an attractive visual look.',
        name: 'Martin Performing Artist Series Custom GPCPA5 Grand Performance Acoustic-Electric Guitar Natural', price: 699.00, inventory: 5, imgURLs: ['Martin_Artist_Custom_GPCPA5_1', 'Martin_Artist_Custom_GPCPA5_2', 'Martin_Artist_Custom_GPCPA5_3', 'Martin_Artist_Custom_GPCPA5_4', 'Martin_Artist_Custom_GPCPA5_5', 'Martin_Artist_Custom_GPCPA5_6'] }),
        models.Product.create({ description: 'Designed with electric players in mind, the T5z brings more of an electric guitar look and feel to the popular hollowbody hybrid electric-acoustic T5 series. Electric-friendly features include a more compact body than the original T5, plus a 12-inch fretboard radius and jumbo frets that making bending strings easier. If you are looking for a versatile stage or recording guitar that blends the feel of an electric with a full range of acoustic and electric tones, the T5z gives you an essential musical tool.',
        name: 'Taylor T5z Pro Acoustic-Electric Guitar', price: 2699.00, inventory: 7, imgURLs: ['Taylor_T5z_Pro_Acoustic-Electric_Guitar_1', 'Taylor_T5z_Pro_Acoustic-Electric_Guitar_2', 'Taylor_T5z_Pro_Acoustic-Electric_Guitar_3', 'Taylor_T5z_Pro_Acoustic-Electric_Guitar_4', 'Taylor_T5z_Pro_Acoustic-Electric_Guitar_5', 'Taylor_T5z_Pro_Acoustic-Electric_Guitar_6'] }),
        models.Product.create({ description: 'The Korg Kronos is the flagship keyboard of Korgs synthesizer line. It is available in three configurations, each with the same phenomenal performance, production and synthesis capacity. The only difference between the three models is the key bed. This is the full 88-key version, equipped with Korgs RH-3 (Real Weighted Hammer Action 3) keyboard, one of the professional keyboard industrys best-loved piano touches. It is the same keyboard used on Korgs upper-end piano models and on the Korg SV-1. The hammer weighting is graded, providing a heavier feel in the lower register and a lighter feel in the upper register, just as on a grand piano, offering superb playability.',
        name: 'Korg New Kronos 88-Key Piano, Synthesizer & Music Workstation', price: 3699.00, inventory: 3, imgURLs: ['Korg_New_Kronos_88_1', 'Korg_New_Kronos_88_2', 'Korg_New_Kronos_88_3', 'Korg_New_Kronos_88_4', 'Korg_New_Kronos_88_5', 'Korg_New_Kronos_88_6'] }),
        models.Product.create({ description: 'Rolands JUNO synths are known everywhere for their great sound, ease of use, and exceptional value. Beginning in the 70s with some of the earliest mass-produced analog synthesizers, the Juno lines new releases are always hotly anticipated. The JUNO-DS88 takes the iconic series to a new level of performance, adding many powerful enhancements while still keeping operation streamlined and simple. Equipped with 88 weighted-action keys for a premium feel, the versatile, intuitive JUNO-DS88 puts you in creative command, making it easy to produce exceptional music everywhere you play.',
        name: 'Roland JUNO-DS88 Piano & Synthesizer', price: 1000.00, inventory: 6, imgURLs: ['Roland_JUNO-DS88_1', 'Roland_JUNO-DS88_2', 'Roland_JUNO-DS88_3', 'Roland_JUNO-DS88_4', 'Roland_JUNO-DS88_5'] }),
        models.Product.create({ description: 'With the size of a combo, but sporting two 12" 60-watt Celestion Vintage 30 speakers, this compact-sized PPC212-OB speaker cabinet from the Orange PPC series features an open-back design and is the same size as the Rockerverb 50C and AD30TC. The Orange speaker cab features a power handling of 120 watts, producing sizzling guitar tone that is unmistakably Orange. ',
        name: 'Orange Amplifiers PPC Series PPC212OB 120W 2x12 Open Back Guitar Speaker Cab', price: 599.00, inventory: 10, imgURLs: ['Orange_Amplifiers_PPC212OB_1', 'Orange_Amplifiers_PPC212OB_2'] })

        // models.Product.create({ description: '',
        // name: '', price: 0, inventory: 0, imgURLs: ['', '', '', '', ''] })
      ];
      return Promise.all(promiseArr)
    })
    .then(products => {
      categories[0].addProducts(products[0]);
      categories[1].addProducts(products[0]);
      categories[0].addProducts(products[1]);
      categories[1].addProducts(products[1]);
      categories[0].addProducts(products[2]);
      categories[1].addProducts(products[2]);
      categories[0].addProducts(products[3]);
      categories[1].addProducts(products[3]);
      categories[0].addProducts(products[4]);
      categories[1].addProducts(products[4]);
      categories[3].addProducts(products[5]);
      categories[4].addProducts(products[5]);
      categories[3].addProducts(products[6]);
      categories[4].addProducts(products[6]);
      categories[2].addProducts(products[7]);
    })
}

module.exports = seed;
