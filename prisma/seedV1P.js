import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const departamentos = await prisma.region.createMany({
    data: [
      {
        id: "01",
        name: "Amazonas",
      },
      {
        id: "02",
        name: "Áncash",
      },
      {
        id: "03",
        name: "Apurímac",
      },
      {
        id: "04",
        name: "Arequipa",
      },
      {
        id: "05",
        name: "Ayacucho",
      },
      {
        id: "06",
        name: "Cajamarca",
      },
      {
        id: "07",
        name: "Callao",
      },
      {
        id: "08",
        name: "Cusco",
      },
      {
        id: "09",
        name: "Huancavelica",
      },
      {
        id: "10",
        name: "Huánuco",
      },
      {
        id: "11",
        name: "Ica",
      },
      {
        id: "12",
        name: "Junín",
      },
      {
        id: "13",
        name: "La Libertad",
      },
      {
        id: "14",
        name: "Lambayeque",
      },
      {
        id: "15",
        name: "Lima",
      },
      {
        id: "16",
        name: "Loreto",
      },
      {
        id: "17",
        name: "Madre de Dios",
      },
      {
        id: "18",
        name: "Moquegua",
      },
      {
        id: "19",
        name: "Pasco",
      },
      {
        id: "20",
        name: "Piura",
      },
      {
        id: "21",
        name: "Puno",
      },
      {
        id: "22",
        name: "San Martín",
      },
      {
        id: "23",
        name: "Tacna",
      },
      {
        id: "24",
        name: "Tumbes",
      },
      {
        id: "25",
        name: "Ucayali",
      },
    ],
  });

  const provinces = await prisma.province.createMany({
    data: [
      {
        id: "0101",
        name: "Chachapoyas",
        region_id: "01",
      },
      {
        id: "0102",
        name: "Bagua",
        region_id: "01",
      },
      {
        id: "0103",
        name: "Bongará",
        region_id: "01",
      },
      {
        id: "0104",
        name: "Condorcanqui",
        region_id: "01",
      },
      {
        id: "0105",
        name: "Luya",
        region_id: "01",
      },
      {
        id: "0106",
        name: "Rodríguez de Mendoza",
        region_id: "01",
      },
      {
        id: "0107",
        name: "Utcubamba",
        region_id: "01",
      },
      {
        id: "0201",
        name: "Huaraz",
        region_id: "02",
      },
      {
        id: "0202",
        name: "Aija",
        region_id: "02",
      },
      {
        id: "0203",
        name: "Antonio Raymondi",
        region_id: "02",
      },
      {
        id: "0204",
        name: "Asunción",
        region_id: "02",
      },
      {
        id: "0205",
        name: "Bolognesi",
        region_id: "02",
      },
      {
        id: "0206",
        name: "Carhuaz",
        region_id: "02",
      },
      {
        id: "0207",
        name: "Carlos Fermín Fitzcarrald",
        region_id: "02",
      },
      {
        id: "0208",
        name: "Casma",
        region_id: "02",
      },
      {
        id: "0209",
        name: "Corongo",
        region_id: "02",
      },
      {
        id: "0210",
        name: "Huari",
        region_id: "02",
      },
      {
        id: "0211",
        name: "Huarmey",
        region_id: "02",
      },
      {
        id: "0212",
        name: "Huaylas",
        region_id: "02",
      },
      {
        id: "0213",
        name: "Mariscal Luzuriaga",
        region_id: "02",
      },
      {
        id: "0214",
        name: "Ocros",
        region_id: "02",
      },
      {
        id: "0215",
        name: "Pallasca",
        region_id: "02",
      },
      {
        id: "0216",
        name: "Pomabamba",
        region_id: "02",
      },
      {
        id: "0217",
        name: "Recuay",
        region_id: "02",
      },
      {
        id: "0218",
        name: "Santa",
        region_id: "02",
      },
      {
        id: "0219",
        name: "Sihuas",
        region_id: "02",
      },
      {
        id: "0220",
        name: "Yungay",
        region_id: "02",
      },
      {
        id: "0301",
        name: "Abancay",
        region_id: "03",
      },
      {
        id: "0302",
        name: "Andahuaylas",
        region_id: "03",
      },
      {
        id: "0303",
        name: "Antabamba",
        region_id: "03",
      },
      {
        id: "0304",
        name: "Aymaraes",
        region_id: "03",
      },
      {
        id: "0305",
        name: "Cotabambas",
        region_id: "03",
      },
      {
        id: "0306",
        name: "Chincheros",
        region_id: "03",
      },
      {
        id: "0307",
        name: "Grau",
        region_id: "03",
      },
      {
        id: "0401",
        name: "Arequipa",
        region_id: "04",
      },
      {
        id: "0402",
        name: "Camaná",
        region_id: "04",
      },
      {
        id: "0403",
        name: "Caravelí",
        region_id: "04",
      },
      {
        id: "0404",
        name: "Castilla",
        region_id: "04",
      },
      {
        id: "0405",
        name: "Caylloma",
        region_id: "04",
      },
      {
        id: "0406",
        name: "Condesuyos",
        region_id: "04",
      },
      {
        id: "0407",
        name: "Islay",
        region_id: "04",
      },
      {
        id: "0408",
        name: "La Uniòn",
        region_id: "04",
      },
      {
        id: "0501",
        name: "Huamanga",
        region_id: "05",
      },
      {
        id: "0502",
        name: "Cangallo",
        region_id: "05",
      },
      {
        id: "0503",
        name: "Huanca Sancos",
        region_id: "05",
      },
      {
        id: "0504",
        name: "Huanta",
        region_id: "05",
      },
      {
        id: "0505",
        name: "La Mar",
        region_id: "05",
      },
      {
        id: "0506",
        name: "Lucanas",
        region_id: "05",
      },
      {
        id: "0507",
        name: "Parinacochas",
        region_id: "05",
      },
      {
        id: "0508",
        name: "Pàucar del Sara Sara",
        region_id: "05",
      },
      {
        id: "0509",
        name: "Sucre",
        region_id: "05",
      },
      {
        id: "0510",
        name: "Víctor Fajardo",
        region_id: "05",
      },
      {
        id: "0511",
        name: "Vilcas Huamán",
        region_id: "05",
      },
      {
        id: "0601",
        name: "Cajamarca",
        region_id: "06",
      },
      {
        id: "0602",
        name: "Cajabamba",
        region_id: "06",
      },
      {
        id: "0603",
        name: "Celendín",
        region_id: "06",
      },
      {
        id: "0604",
        name: "Chota",
        region_id: "06",
      },
      {
        id: "0605",
        name: "Contumazá",
        region_id: "06",
      },
      {
        id: "0606",
        name: "Cutervo",
        region_id: "06",
      },
      {
        id: "0607",
        name: "Hualgayoc",
        region_id: "06",
      },
      {
        id: "0608",
        name: "Jaén",
        region_id: "06",
      },
      {
        id: "0609",
        name: "San Ignacio",
        region_id: "06",
      },
      {
        id: "0610",
        name: "San Marcos",
        region_id: "06",
      },
      {
        id: "0611",
        name: "San Miguel",
        region_id: "06",
      },
      {
        id: "0612",
        name: "San Pablo",
        region_id: "06",
      },
      {
        id: "0613",
        name: "Santa Cruz",
        region_id: "06",
      },
      {
        id: "0701",
        name: "Prov. Const. del Callao",
        region_id: "07",
      },
      {
        id: "0801",
        name: "Cusco",
        region_id: "08",
      },
      {
        id: "0802",
        name: "Acomayo",
        region_id: "08",
      },
      {
        id: "0803",
        name: "Anta",
        region_id: "08",
      },
      {
        id: "0804",
        name: "Calca",
        region_id: "08",
      },
      {
        id: "0805",
        name: "Canas",
        region_id: "08",
      },
      {
        id: "0806",
        name: "Canchis",
        region_id: "08",
      },
      {
        id: "0807",
        name: "Chumbivilcas",
        region_id: "08",
      },
      {
        id: "0808",
        name: "Espinar",
        region_id: "08",
      },
      {
        id: "0809",
        name: "La Convención",
        region_id: "08",
      },
      {
        id: "0810",
        name: "Paruro",
        region_id: "08",
      },
      {
        id: "0811",
        name: "Paucartambo",
        region_id: "08",
      },
      {
        id: "0812",
        name: "Quispicanchi",
        region_id: "08",
      },
      {
        id: "0813",
        name: "Urubamba",
        region_id: "08",
      },
      {
        id: "0901",
        name: "Huancavelica",
        region_id: "09",
      },
      {
        id: "0902",
        name: "Acobamba",
        region_id: "09",
      },
      {
        id: "0903",
        name: "Angaraes",
        region_id: "09",
      },
      {
        id: "0904",
        name: "Castrovirreyna",
        region_id: "09",
      },
      {
        id: "0905",
        name: "Churcampa",
        region_id: "09",
      },
      {
        id: "0906",
        name: "Huaytará",
        region_id: "09",
      },
      {
        id: "0907",
        name: "Tayacaja",
        region_id: "09",
      },
      {
        id: "1001",
        name: "Huánuco",
        region_id: "10",
      },
      {
        id: "1002",
        name: "Ambo",
        region_id: "10",
      },
      {
        id: "1003",
        name: "Dos de Mayo",
        region_id: "10",
      },
      {
        id: "1004",
        name: "Huacaybamba",
        region_id: "10",
      },
      {
        id: "1005",
        name: "Huamalíes",
        region_id: "10",
      },
      {
        id: "1006",
        name: "Leoncio Prado",
        region_id: "10",
      },
      {
        id: "1007",
        name: "Marañón",
        region_id: "10",
      },
      {
        id: "1008",
        name: "Pachitea",
        region_id: "10",
      },
      {
        id: "1009",
        name: "Puerto Inca",
        region_id: "10",
      },
      {
        id: "1010",
        name: "Lauricocha ",
        region_id: "10",
      },
      {
        id: "1011",
        name: "Yarowilca ",
        region_id: "10",
      },
      {
        id: "1101",
        name: "Ica ",
        region_id: "11",
      },
      {
        id: "1102",
        name: "Chincha ",
        region_id: "11",
      },
      {
        id: "1103",
        name: "Nasca ",
        region_id: "11",
      },
      {
        id: "1104",
        name: "Palpa ",
        region_id: "11",
      },
      {
        id: "1105",
        name: "Pisco ",
        region_id: "11",
      },
      {
        id: "1201",
        name: "Huancayo ",
        region_id: "12",
      },
      {
        id: "1202",
        name: "Concepción ",
        region_id: "12",
      },
      {
        id: "1203",
        name: "Chanchamayo ",
        region_id: "12",
      },
      {
        id: "1204",
        name: "Jauja ",
        region_id: "12",
      },
      {
        id: "1205",
        name: "Junín ",
        region_id: "12",
      },
      {
        id: "1206",
        name: "Satipo ",
        region_id: "12",
      },
      {
        id: "1207",
        name: "Tarma ",
        region_id: "12",
      },
      {
        id: "1208",
        name: "Yauli ",
        region_id: "12",
      },
      {
        id: "1209",
        name: "Chupaca ",
        region_id: "12",
      },
      {
        id: "1301",
        name: "Trujillo ",
        region_id: "13",
      },
      {
        id: "1302",
        name: "Ascope ",
        region_id: "13",
      },
      {
        id: "1303",
        name: "Bolívar ",
        region_id: "13",
      },
      {
        id: "1304",
        name: "Chepén ",
        region_id: "13",
      },
      {
        id: "1305",
        name: "Julcán ",
        region_id: "13",
      },
      {
        id: "1306",
        name: "Otuzco ",
        region_id: "13",
      },
      {
        id: "1307",
        name: "Pacasmayo ",
        region_id: "13",
      },
      {
        id: "1308",
        name: "Pataz ",
        region_id: "13",
      },
      {
        id: "1309",
        name: "Sánchez Carrión ",
        region_id: "13",
      },
      {
        id: "1310",
        name: "Santiago de Chuco ",
        region_id: "13",
      },
      {
        id: "1311",
        name: "Gran Chimú ",
        region_id: "13",
      },
      {
        id: "1312",
        name: "Virú ",
        region_id: "13",
      },
      {
        id: "1401",
        name: "Chiclayo ",
        region_id: "14",
      },
      {
        id: "1402",
        name: "Ferreñafe ",
        region_id: "14",
      },
      {
        id: "1403",
        name: "Lambayeque ",
        region_id: "14",
      },
      {
        id: "1501",
        name: "Lima ",
        region_id: "15",
      },
      {
        id: "1502",
        name: "Barranca ",
        region_id: "15",
      },
      {
        id: "1503",
        name: "Cajatambo ",
        region_id: "15",
      },
      {
        id: "1504",
        name: "Canta ",
        region_id: "15",
      },
      {
        id: "1505",
        name: "Cañete ",
        region_id: "15",
      },
      {
        id: "1506",
        name: "Huaral ",
        region_id: "15",
      },
      {
        id: "1507",
        name: "Huarochirí ",
        region_id: "15",
      },
      {
        id: "1508",
        name: "Huaura ",
        region_id: "15",
      },
      {
        id: "1509",
        name: "Oyón ",
        region_id: "15",
      },
      {
        id: "1510",
        name: "Yauyos ",
        region_id: "15",
      },
      {
        id: "1601",
        name: "Maynas ",
        region_id: "16",
      },
      {
        id: "1602",
        name: "Alto Amazonas ",
        region_id: "16",
      },
      {
        id: "1603",
        name: "Loreto ",
        region_id: "16",
      },
      {
        id: "1604",
        name: "Mariscal Ramón Castilla ",
        region_id: "16",
      },
      {
        id: "1605",
        name: "Requena ",
        region_id: "16",
      },
      {
        id: "1606",
        name: "Ucayali ",
        region_id: "16",
      },
      {
        id: "1607",
        name: "Datem del Marañón ",
        region_id: "16",
      },
      {
        id: "1608",
        name: "Putumayo",
        region_id: "16",
      },
      {
        id: "1701",
        name: "Tambopata ",
        region_id: "17",
      },
      {
        id: "1702",
        name: "Manu ",
        region_id: "17",
      },
      {
        id: "1703",
        name: "Tahuamanu ",
        region_id: "17",
      },
      {
        id: "1801",
        name: "Mariscal Nieto ",
        region_id: "18",
      },
      {
        id: "1802",
        name: "General Sánchez Cerro ",
        region_id: "18",
      },
      {
        id: "1803",
        name: "Ilo ",
        region_id: "18",
      },
      {
        id: "1901",
        name: "Pasco ",
        region_id: "19",
      },
      {
        id: "1902",
        name: "Daniel Alcides Carrión ",
        region_id: "19",
      },
      {
        id: "1903",
        name: "Oxapampa ",
        region_id: "19",
      },
      {
        id: "2001",
        name: "Piura ",
        region_id: "20",
      },
      {
        id: "2002",
        name: "Ayabaca ",
        region_id: "20",
      },
      {
        id: "2003",
        name: "Huancabamba ",
        region_id: "20",
      },
      {
        id: "2004",
        name: "Morropón ",
        region_id: "20",
      },
      {
        id: "2005",
        name: "Paita ",
        region_id: "20",
      },
      {
        id: "2006",
        name: "Sullana ",
        region_id: "20",
      },
      {
        id: "2007",
        name: "Talara ",
        region_id: "20",
      },
      {
        id: "2008",
        name: "Sechura ",
        region_id: "20",
      },
      {
        id: "2101",
        name: "Puno ",
        region_id: "21",
      },
      {
        id: "2102",
        name: "Azángaro ",
        region_id: "21",
      },
      {
        id: "2103",
        name: "Carabaya ",
        region_id: "21",
      },
      {
        id: "2104",
        name: "Chucuito ",
        region_id: "21",
      },
      {
        id: "2105",
        name: "El Collao ",
        region_id: "21",
      },
      {
        id: "2106",
        name: "Huancané ",
        region_id: "21",
      },
      {
        id: "2107",
        name: "Lampa ",
        region_id: "21",
      },
      {
        id: "2108",
        name: "Melgar ",
        region_id: "21",
      },
      {
        id: "2109",
        name: "Moho ",
        region_id: "21",
      },
      {
        id: "2110",
        name: "San Antonio de Putina ",
        region_id: "21",
      },
      {
        id: "2111",
        name: "San Román ",
        region_id: "21",
      },
      {
        id: "2112",
        name: "Sandia ",
        region_id: "21",
      },
      {
        id: "2113",
        name: "Yunguyo ",
        region_id: "21",
      },
      {
        id: "2201",
        name: "Moyobamba ",
        region_id: "22",
      },
      {
        id: "2202",
        name: "Bellavista ",
        region_id: "22",
      },
      {
        id: "2203",
        name: "El Dorado ",
        region_id: "22",
      },
      {
        id: "2204",
        name: "Huallaga ",
        region_id: "22",
      },
      {
        id: "2205",
        name: "Lamas ",
        region_id: "22",
      },
      {
        id: "2206",
        name: "Mariscal Cáceres ",
        region_id: "22",
      },
      {
        id: "2207",
        name: "Picota ",
        region_id: "22",
      },
      {
        id: "2208",
        name: "Rioja ",
        region_id: "22",
      },
      {
        id: "2209",
        name: "San Martín ",
        region_id: "22",
      },
      {
        id: "2210",
        name: "Tocache ",
        region_id: "22",
      },
      {
        id: "2301",
        name: "Tacna ",
        region_id: "23",
      },
      {
        id: "2302",
        name: "Candarave ",
        region_id: "23",
      },
      {
        id: "2303",
        name: "Jorge Basadre ",
        region_id: "23",
      },
      {
        id: "2304",
        name: "Tarata ",
        region_id: "23",
      },
      {
        id: "2401",
        name: "Tumbes ",
        region_id: "24",
      },
      {
        id: "2402",
        name: "Contralmirante Villar ",
        region_id: "24",
      },
      {
        id: "2403",
        name: "Zarumilla ",
        region_id: "24",
      },
      {
        id: "2501",
        name: "Coronel Portillo ",
        region_id: "25",
      },
      {
        id: "2502",
        name: "Atalaya ",
        region_id: "25",
      },
      {
        id: "2503",
        name: "Padre Abad ",
        region_id: "25",
      },
      {
        id: "2504",
        name: "Purús",
        region_id: "25",
      },
    ],
  });

  const districts = await prisma.district.createMany({
    data: [
      {
        id: "010101",
        name: "Chachapoyas",
        province_id: "0101",
      },
      {
        id: "010102",
        name: "Asunción",
        province_id: "0101",
      },
      {
        id: "010103",
        name: "Balsas",
        province_id: "0101",
      },
      {
        id: "010104",
        name: "Cheto",
        province_id: "0101",
      },
      {
        id: "010105",
        name: "Chiliquin",
        province_id: "0101",
      },
      {
        id: "010106",
        name: "Chuquibamba",
        province_id: "0101",
      },
      {
        id: "010107",
        name: "Granada",
        province_id: "0101",
      },
      {
        id: "010108",
        name: "Huancas",
        province_id: "0101",
      },
      {
        id: "010109",
        name: "La Jalca",
        province_id: "0101",
      },
      {
        id: "010110",
        name: "Leimebamba",
        province_id: "0101",
      },
      {
        id: "010111",
        name: "Levanto",
        province_id: "0101",
      },
      {
        id: "010112",
        name: "Magdalena",
        province_id: "0101",
      },
      {
        id: "010113",
        name: "Mariscal Castilla",
        province_id: "0101",
      },
      {
        id: "010114",
        name: "Molinopampa",
        province_id: "0101",
      },
      {
        id: "010115",
        name: "Montevideo",
        province_id: "0101",
      },
      {
        id: "010116",
        name: "Olleros",
        province_id: "0101",
      },
      {
        id: "010117",
        name: "Quinjalca",
        province_id: "0101",
      },
      {
        id: "010118",
        name: "San Francisco de Daguas",
        province_id: "0101",
      },
      {
        id: "010119",
        name: "San Isidro de Maino",
        province_id: "0101",
      },
      {
        id: "010120",
        name: "Soloco",
        province_id: "0101",
      },
      {
        id: "010121",
        name: "Sonche",
        province_id: "0101",
      },
      {
        id: "010201",
        name: "Bagua",
        province_id: "0102",
      },
      {
        id: "010202",
        name: "Aramango",
        province_id: "0102",
      },
      {
        id: "010203",
        name: "Copallin",
        province_id: "0102",
      },
      {
        id: "010204",
        name: "El Parco",
        province_id: "0102",
      },
      {
        id: "010205",
        name: "Imaza",
        province_id: "0102",
      },
      {
        id: "010206",
        name: "La Peca",
        province_id: "0102",
      },
      {
        id: "010301",
        name: "Jumbilla",
        province_id: "0103",
      },
      {
        id: "010302",
        name: "Chisquilla",
        province_id: "0103",
      },
      {
        id: "010303",
        name: "Churuja",
        province_id: "0103",
      },
      {
        id: "010304",
        name: "Corosha",
        province_id: "0103",
      },
      {
        id: "010305",
        name: "Cuispes",
        province_id: "0103",
      },
      {
        id: "010306",
        name: "Florida",
        province_id: "0103",
      },
      {
        id: "010307",
        name: "Jazan",
        province_id: "0103",
      },
      {
        id: "010308",
        name: "Recta",
        province_id: "0103",
      },
      {
        id: "010309",
        name: "San Carlos",
        province_id: "0103",
      },
      {
        id: "010310",
        name: "Shipasbamba",
        province_id: "0103",
      },
      {
        id: "010311",
        name: "Valera",
        province_id: "0103",
      },
      {
        id: "010312",
        name: "Yambrasbamba",
        province_id: "0103",
      },
      {
        id: "010401",
        name: "Nieva",
        province_id: "0104",
      },
      {
        id: "010402",
        name: "El Cenepa",
        province_id: "0104",
      },
      {
        id: "010403",
        name: "Río Santiago",
        province_id: "0104",
      },
      {
        id: "010501",
        name: "Lamud",
        province_id: "0105",
      },
      {
        id: "010502",
        name: "Camporredondo",
        province_id: "0105",
      },
      {
        id: "010503",
        name: "Cocabamba",
        province_id: "0105",
      },
      {
        id: "010504",
        name: "Colcamar",
        province_id: "0105",
      },
      {
        id: "010505",
        name: "Conila",
        province_id: "0105",
      },
      {
        id: "010506",
        name: "Inguilpata",
        province_id: "0105",
      },
      {
        id: "010507",
        name: "Longuita",
        province_id: "0105",
      },
      {
        id: "010508",
        name: "Lonya Chico",
        province_id: "0105",
      },
      {
        id: "010509",
        name: "Luya",
        province_id: "0105",
      },
      {
        id: "010510",
        name: "Luya Viejo",
        province_id: "0105",
      },
      {
        id: "010511",
        name: "María",
        province_id: "0105",
      },
      {
        id: "010512",
        name: "Ocalli",
        province_id: "0105",
      },
      {
        id: "010513",
        name: "Ocumal",
        province_id: "0105",
      },
      {
        id: "010514",
        name: "Pisuquia",
        province_id: "0105",
      },
      {
        id: "010515",
        name: "Providencia",
        province_id: "0105",
      },
      {
        id: "010516",
        name: "San Cristóbal",
        province_id: "0105",
      },
      {
        id: "010517",
        name: "San Francisco de Yeso",
        province_id: "0105",
      },
      {
        id: "010518",
        name: "San Jerónimo",
        province_id: "0105",
      },
      {
        id: "010519",
        name: "San Juan de Lopecancha",
        province_id: "0105",
      },
      {
        id: "010520",
        name: "Santa Catalina",
        province_id: "0105",
      },
      {
        id: "010521",
        name: "Santo Tomas",
        province_id: "0105",
      },
      {
        id: "010522",
        name: "Tingo",
        province_id: "0105",
      },
      {
        id: "010523",
        name: "Trita",
        province_id: "0105",
      },
      {
        id: "010601",
        name: "San Nicolás",
        province_id: "0106",
      },
      {
        id: "010602",
        name: "Chirimoto",
        province_id: "0106",
      },
      {
        id: "010603",
        name: "Cochamal",
        province_id: "0106",
      },
      {
        id: "010604",
        name: "Huambo",
        province_id: "0106",
      },
      {
        id: "010605",
        name: "Limabamba",
        province_id: "0106",
      },
      {
        id: "010606",
        name: "Longar",
        province_id: "0106",
      },
      {
        id: "010607",
        name: "Mariscal Benavides",
        province_id: "0106",
      },
      {
        id: "010608",
        name: "Milpuc",
        province_id: "0106",
      },
      {
        id: "010609",
        name: "Omia",
        province_id: "0106",
      },
      {
        id: "010610",
        name: "Santa Rosa",
        province_id: "0106",
      },
      {
        id: "010611",
        name: "Totora",
        province_id: "0106",
      },
      {
        id: "010612",
        name: "Vista Alegre",
        province_id: "0106",
      },
      {
        id: "010701",
        name: "Bagua Grande",
        province_id: "0107",
      },
      {
        id: "010702",
        name: "Cajaruro",
        province_id: "0107",
      },
      {
        id: "010703",
        name: "Cumba",
        province_id: "0107",
      },
      {
        id: "010704",
        name: "El Milagro",
        province_id: "0107",
      },
      {
        id: "010705",
        name: "Jamalca",
        province_id: "0107",
      },
      {
        id: "010706",
        name: "Lonya Grande",
        province_id: "0107",
      },
      {
        id: "010707",
        name: "Yamon",
        province_id: "0107",
      },
      {
        id: "020101",
        name: "Huaraz",
        province_id: "0201",
      },
      {
        id: "020102",
        name: "Cochabamba",
        province_id: "0201",
      },
      {
        id: "020103",
        name: "Colcabamba",
        province_id: "0201",
      },
      {
        id: "020104",
        name: "Huanchay",
        province_id: "0201",
      },
      {
        id: "020105",
        name: "Independencia",
        province_id: "0201",
      },
      {
        id: "020106",
        name: "Jangas",
        province_id: "0201",
      },
      {
        id: "020107",
        name: "La Libertad",
        province_id: "0201",
      },
      {
        id: "020108",
        name: "Olleros",
        province_id: "0201",
      },
      {
        id: "020109",
        name: "Pampas Grande",
        province_id: "0201",
      },
      {
        id: "020110",
        name: "Pariacoto",
        province_id: "0201",
      },
      {
        id: "020111",
        name: "Pira",
        province_id: "0201",
      },
      {
        id: "020112",
        name: "Tarica",
        province_id: "0201",
      },
      {
        id: "020201",
        name: "Aija",
        province_id: "0202",
      },
      {
        id: "020202",
        name: "Coris",
        province_id: "0202",
      },
      {
        id: "020203",
        name: "Huacllan",
        province_id: "0202",
      },
      {
        id: "020204",
        name: "La Merced",
        province_id: "0202",
      },
      {
        id: "020205",
        name: "Succha",
        province_id: "0202",
      },
      {
        id: "020301",
        name: "Llamellin",
        province_id: "0203",
      },
      {
        id: "020302",
        name: "Aczo",
        province_id: "0203",
      },
      {
        id: "020303",
        name: "Chaccho",
        province_id: "0203",
      },
      {
        id: "020304",
        name: "Chingas",
        province_id: "0203",
      },
      {
        id: "020305",
        name: "Mirgas",
        province_id: "0203",
      },
      {
        id: "020306",
        name: "San Juan de Rontoy",
        province_id: "0203",
      },
      {
        id: "020401",
        name: "Chacas",
        province_id: "0204",
      },
      {
        id: "020402",
        name: "Acochaca",
        province_id: "0204",
      },
      {
        id: "020501",
        name: "Chiquian",
        province_id: "0205",
      },
      {
        id: "020502",
        name: "Abelardo Pardo Lezameta",
        province_id: "0205",
      },
      {
        id: "020503",
        name: "Antonio Raymondi",
        province_id: "0205",
      },
      {
        id: "020504",
        name: "Aquia",
        province_id: "0205",
      },
      {
        id: "020505",
        name: "Cajacay",
        province_id: "0205",
      },
      {
        id: "020506",
        name: "Canis",
        province_id: "0205",
      },
      {
        id: "020507",
        name: "Colquioc",
        province_id: "0205",
      },
      {
        id: "020508",
        name: "Huallanca",
        province_id: "0205",
      },
      {
        id: "020509",
        name: "Huasta",
        province_id: "0205",
      },
      {
        id: "020510",
        name: "Huayllacayan",
        province_id: "0205",
      },
      {
        id: "020511",
        name: "La Primavera",
        province_id: "0205",
      },
      {
        id: "020512",
        name: "Mangas",
        province_id: "0205",
      },
      {
        id: "020513",
        name: "Pacllon",
        province_id: "0205",
      },
      {
        id: "020514",
        name: "San Miguel de Corpanqui",
        province_id: "0205",
      },
      {
        id: "020515",
        name: "Ticllos",
        province_id: "0205",
      },
      {
        id: "020601",
        name: "Carhuaz",
        province_id: "0206",
      },
      {
        id: "020602",
        name: "Acopampa",
        province_id: "0206",
      },
      {
        id: "020603",
        name: "Amashca",
        province_id: "0206",
      },
      {
        id: "020604",
        name: "Anta",
        province_id: "0206",
      },
      {
        id: "020605",
        name: "Ataquero",
        province_id: "0206",
      },
      {
        id: "020606",
        name: "Marcara",
        province_id: "0206",
      },
      {
        id: "020607",
        name: "Pariahuanca",
        province_id: "0206",
      },
      {
        id: "020608",
        name: "San Miguel de Aco",
        province_id: "0206",
      },
      {
        id: "020609",
        name: "Shilla",
        province_id: "0206",
      },
      {
        id: "020610",
        name: "Tinco",
        province_id: "0206",
      },
      {
        id: "020611",
        name: "Yungar",
        province_id: "0206",
      },
      {
        id: "020701",
        name: "San Luis",
        province_id: "0207",
      },
      {
        id: "020702",
        name: "San Nicolás",
        province_id: "0207",
      },
      {
        id: "020703",
        name: "Yauya",
        province_id: "0207",
      },
      {
        id: "020801",
        name: "Casma",
        province_id: "0208",
      },
      {
        id: "020802",
        name: "Buena Vista Alta",
        province_id: "0208",
      },
      {
        id: "020803",
        name: "Comandante Noel",
        province_id: "0208",
      },
      {
        id: "020804",
        name: "Yautan",
        province_id: "0208",
      },
      {
        id: "020901",
        name: "Corongo",
        province_id: "0209",
      },
      {
        id: "020902",
        name: "Aco",
        province_id: "0209",
      },
      {
        id: "020903",
        name: "Bambas",
        province_id: "0209",
      },
      {
        id: "020904",
        name: "Cusca",
        province_id: "0209",
      },
      {
        id: "020905",
        name: "La Pampa",
        province_id: "0209",
      },
      {
        id: "020906",
        name: "Yanac",
        province_id: "0209",
      },
      {
        id: "020907",
        name: "Yupan",
        province_id: "0209",
      },
      {
        id: "021001",
        name: "Huari",
        province_id: "0210",
      },
      {
        id: "021002",
        name: "Anra",
        province_id: "0210",
      },
      {
        id: "021003",
        name: "Cajay",
        province_id: "0210",
      },
      {
        id: "021004",
        name: "Chavin de Huantar",
        province_id: "0210",
      },
      {
        id: "021005",
        name: "Huacachi",
        province_id: "0210",
      },
      {
        id: "021006",
        name: "Huacchis",
        province_id: "0210",
      },
      {
        id: "021007",
        name: "Huachis",
        province_id: "0210",
      },
      {
        id: "021008",
        name: "Huantar",
        province_id: "0210",
      },
      {
        id: "021009",
        name: "Masin",
        province_id: "0210",
      },
      {
        id: "021010",
        name: "Paucas",
        province_id: "0210",
      },
      {
        id: "021011",
        name: "Ponto",
        province_id: "0210",
      },
      {
        id: "021012",
        name: "Rahuapampa",
        province_id: "0210",
      },
      {
        id: "021013",
        name: "Rapayan",
        province_id: "0210",
      },
      {
        id: "021014",
        name: "San Marcos",
        province_id: "0210",
      },
      {
        id: "021015",
        name: "San Pedro de Chana",
        province_id: "0210",
      },
      {
        id: "021016",
        name: "Uco",
        province_id: "0210",
      },
      {
        id: "021101",
        name: "Huarmey",
        province_id: "0211",
      },
      {
        id: "021102",
        name: "Cochapeti",
        province_id: "0211",
      },
      {
        id: "021103",
        name: "Culebras",
        province_id: "0211",
      },
      {
        id: "021104",
        name: "Huayan",
        province_id: "0211",
      },
      {
        id: "021105",
        name: "Malvas",
        province_id: "0211",
      },
      {
        id: "021201",
        name: "Caraz",
        province_id: "0212",
      },
      {
        id: "021202",
        name: "Huallanca",
        province_id: "0212",
      },
      {
        id: "021203",
        name: "Huata",
        province_id: "0212",
      },
      {
        id: "021204",
        name: "Huaylas",
        province_id: "0212",
      },
      {
        id: "021205",
        name: "Mato",
        province_id: "0212",
      },
      {
        id: "021206",
        name: "Pamparomas",
        province_id: "0212",
      },
      {
        id: "021207",
        name: "Pueblo Libre",
        province_id: "0212",
      },
      {
        id: "021208",
        name: "Santa Cruz",
        province_id: "0212",
      },
      {
        id: "021209",
        name: "Santo Toribio",
        province_id: "0212",
      },
      {
        id: "021210",
        name: "Yuracmarca",
        province_id: "0212",
      },
      {
        id: "021301",
        name: "Piscobamba",
        province_id: "0213",
      },
      {
        id: "021302",
        name: "Casca",
        province_id: "0213",
      },
      {
        id: "021303",
        name: "Eleazar Guzmán Barron",
        province_id: "0213",
      },
      {
        id: "021304",
        name: "Fidel Olivas Escudero",
        province_id: "0213",
      },
      {
        id: "021305",
        name: "Llama",
        province_id: "0213",
      },
      {
        id: "021306",
        name: "Llumpa",
        province_id: "0213",
      },
      {
        id: "021307",
        name: "Lucma",
        province_id: "0213",
      },
      {
        id: "021308",
        name: "Musga",
        province_id: "0213",
      },
      {
        id: "021401",
        name: "Ocros",
        province_id: "0214",
      },
      {
        id: "021402",
        name: "Acas",
        province_id: "0214",
      },
      {
        id: "021403",
        name: "Cajamarquilla",
        province_id: "0214",
      },
      {
        id: "021404",
        name: "Carhuapampa",
        province_id: "0214",
      },
      {
        id: "021405",
        name: "Cochas",
        province_id: "0214",
      },
      {
        id: "021406",
        name: "Congas",
        province_id: "0214",
      },
      {
        id: "021407",
        name: "Llipa",
        province_id: "0214",
      },
      {
        id: "021408",
        name: "San Cristóbal de Rajan",
        province_id: "0214",
      },
      {
        id: "021409",
        name: "San Pedro",
        province_id: "0214",
      },
      {
        id: "021410",
        name: "Santiago de Chilcas",
        province_id: "0214",
      },
      {
        id: "021501",
        name: "Cabana",
        province_id: "0215",
      },
      {
        id: "021502",
        name: "Bolognesi",
        province_id: "0215",
      },
      {
        id: "021503",
        name: "Conchucos",
        province_id: "0215",
      },
      {
        id: "021504",
        name: "Huacaschuque",
        province_id: "0215",
      },
      {
        id: "021505",
        name: "Huandoval",
        province_id: "0215",
      },
      {
        id: "021506",
        name: "Lacabamba",
        province_id: "0215",
      },
      {
        id: "021507",
        name: "Llapo",
        province_id: "0215",
      },
      {
        id: "021508",
        name: "Pallasca",
        province_id: "0215",
      },
      {
        id: "021509",
        name: "Pampas",
        province_id: "0215",
      },
      {
        id: "021510",
        name: "Santa Rosa",
        province_id: "0215",
      },
      {
        id: "021511",
        name: "Tauca",
        province_id: "0215",
      },
      {
        id: "021601",
        name: "Pomabamba",
        province_id: "0216",
      },
      {
        id: "021602",
        name: "Huayllan",
        province_id: "0216",
      },
      {
        id: "021603",
        name: "Parobamba",
        province_id: "0216",
      },
      {
        id: "021604",
        name: "Quinuabamba",
        province_id: "0216",
      },
      {
        id: "021701",
        name: "Recuay",
        province_id: "0217",
      },
      {
        id: "021702",
        name: "Catac",
        province_id: "0217",
      },
      {
        id: "021703",
        name: "Cotaparaco",
        province_id: "0217",
      },
      {
        id: "021704",
        name: "Huayllapampa",
        province_id: "0217",
      },
      {
        id: "021705",
        name: "Llacllin",
        province_id: "0217",
      },
      {
        id: "021706",
        name: "Marca",
        province_id: "0217",
      },
      {
        id: "021707",
        name: "Pampas Chico",
        province_id: "0217",
      },
      {
        id: "021708",
        name: "Pararin",
        province_id: "0217",
      },
      {
        id: "021709",
        name: "Tapacocha",
        province_id: "0217",
      },
      {
        id: "021710",
        name: "Ticapampa",
        province_id: "0217",
      },
      {
        id: "021801",
        name: "Chimbote",
        province_id: "0218",
      },
      {
        id: "021802",
        name: "Cáceres del Perú",
        province_id: "0218",
      },
      {
        id: "021803",
        name: "Coishco",
        province_id: "0218",
      },
      {
        id: "021804",
        name: "Macate",
        province_id: "0218",
      },
      {
        id: "021805",
        name: "Moro",
        province_id: "0218",
      },
      {
        id: "021806",
        name: "Nepeña",
        province_id: "0218",
      },
      {
        id: "021807",
        name: "Samanco",
        province_id: "0218",
      },
      {
        id: "021808",
        name: "Santa",
        province_id: "0218",
      },
      {
        id: "021809",
        name: "Nuevo Chimbote",
        province_id: "0218",
      },
      {
        id: "021901",
        name: "Sihuas",
        province_id: "0219",
      },
      {
        id: "021902",
        name: "Acobamba",
        province_id: "0219",
      },
      {
        id: "021903",
        name: "Alfonso Ugarte",
        province_id: "0219",
      },
      {
        id: "021904",
        name: "Cashapampa",
        province_id: "0219",
      },
      {
        id: "021905",
        name: "Chingalpo",
        province_id: "0219",
      },
      {
        id: "021906",
        name: "Huayllabamba",
        province_id: "0219",
      },
      {
        id: "021907",
        name: "Quiches",
        province_id: "0219",
      },
      {
        id: "021908",
        name: "Ragash",
        province_id: "0219",
      },
      {
        id: "021909",
        name: "San Juan",
        province_id: "0219",
      },
      {
        id: "021910",
        name: "Sicsibamba",
        province_id: "0219",
      },
      {
        id: "022001",
        name: "Yungay",
        province_id: "0220",
      },
      {
        id: "022002",
        name: "Cascapara",
        province_id: "0220",
      },
      {
        id: "022003",
        name: "Mancos",
        province_id: "0220",
      },
      {
        id: "022004",
        name: "Matacoto",
        province_id: "0220",
      },
      {
        id: "022005",
        name: "Quillo",
        province_id: "0220",
      },
      {
        id: "022006",
        name: "Ranrahirca",
        province_id: "0220",
      },
      {
        id: "022007",
        name: "Shupluy",
        province_id: "0220",
      },
      {
        id: "022008",
        name: "Yanama",
        province_id: "0220",
      },
      {
        id: "030101",
        name: "Abancay",
        province_id: "0301",
      },
      {
        id: "030102",
        name: "Chacoche",
        province_id: "0301",
      },
      {
        id: "030103",
        name: "Circa",
        province_id: "0301",
      },
      {
        id: "030104",
        name: "Curahuasi",
        province_id: "0301",
      },
      {
        id: "030105",
        name: "Huanipaca",
        province_id: "0301",
      },
      {
        id: "030106",
        name: "Lambrama",
        province_id: "0301",
      },
      {
        id: "030107",
        name: "Pichirhua",
        province_id: "0301",
      },
      {
        id: "030108",
        name: "San Pedro de Cachora",
        province_id: "0301",
      },
      {
        id: "030109",
        name: "Tamburco",
        province_id: "0301",
      },
      {
        id: "030201",
        name: "Andahuaylas",
        province_id: "0302",
      },
      {
        id: "030202",
        name: "Andarapa",
        province_id: "0302",
      },
      {
        id: "030203",
        name: "Chiara",
        province_id: "0302",
      },
      {
        id: "030204",
        name: "Huancarama",
        province_id: "0302",
      },
      {
        id: "030205",
        name: "Huancaray",
        province_id: "0302",
      },
      {
        id: "030206",
        name: "Huayana",
        province_id: "0302",
      },
      {
        id: "030207",
        name: "Kishuara",
        province_id: "0302",
      },
      {
        id: "030208",
        name: "Pacobamba",
        province_id: "0302",
      },
      {
        id: "030209",
        name: "Pacucha",
        province_id: "0302",
      },
      {
        id: "030210",
        name: "Pampachiri",
        province_id: "0302",
      },
      {
        id: "030211",
        name: "Pomacocha",
        province_id: "0302",
      },
      {
        id: "030212",
        name: "San Antonio de Cachi",
        province_id: "0302",
      },
      {
        id: "030213",
        name: "San Jerónimo",
        province_id: "0302",
      },
      {
        id: "030214",
        name: "San Miguel de Chaccrampa",
        province_id: "0302",
      },
      {
        id: "030215",
        name: "Santa María de Chicmo",
        province_id: "0302",
      },
      {
        id: "030216",
        name: "Talavera",
        province_id: "0302",
      },
      {
        id: "030217",
        name: "Tumay Huaraca",
        province_id: "0302",
      },
      {
        id: "030218",
        name: "Turpo",
        province_id: "0302",
      },
      {
        id: "030219",
        name: "Kaquiabamba",
        province_id: "0302",
      },
      {
        id: "030220",
        name: "José María Arguedas",
        province_id: "0302",
      },
      {
        id: "030301",
        name: "Antabamba",
        province_id: "0303",
      },
      {
        id: "030302",
        name: "El Oro",
        province_id: "0303",
      },
      {
        id: "030303",
        name: "Huaquirca",
        province_id: "0303",
      },
      {
        id: "030304",
        name: "Juan Espinoza Medrano",
        province_id: "0303",
      },
      {
        id: "030305",
        name: "Oropesa",
        province_id: "0303",
      },
      {
        id: "030306",
        name: "Pachaconas",
        province_id: "0303",
      },
      {
        id: "030307",
        name: "Sabaino",
        province_id: "0303",
      },
      {
        id: "030401",
        name: "Chalhuanca",
        province_id: "0304",
      },
      {
        id: "030402",
        name: "Capaya",
        province_id: "0304",
      },
      {
        id: "030403",
        name: "Caraybamba",
        province_id: "0304",
      },
      {
        id: "030404",
        name: "Chapimarca",
        province_id: "0304",
      },
      {
        id: "030405",
        name: "Colcabamba",
        province_id: "0304",
      },
      {
        id: "030406",
        name: "Cotaruse",
        province_id: "0304",
      },
      {
        id: "030407",
        name: "Ihuayllo",
        province_id: "0304",
      },
      {
        id: "030408",
        name: "Justo Apu Sahuaraura",
        province_id: "0304",
      },
      {
        id: "030409",
        name: "Lucre",
        province_id: "0304",
      },
      {
        id: "030410",
        name: "Pocohuanca",
        province_id: "0304",
      },
      {
        id: "030411",
        name: "San Juan de Chacña",
        province_id: "0304",
      },
      {
        id: "030412",
        name: "Sañayca",
        province_id: "0304",
      },
      {
        id: "030413",
        name: "Soraya",
        province_id: "0304",
      },
      {
        id: "030414",
        name: "Tapairihua",
        province_id: "0304",
      },
      {
        id: "030415",
        name: "Tintay",
        province_id: "0304",
      },
      {
        id: "030416",
        name: "Toraya",
        province_id: "0304",
      },
      {
        id: "030417",
        name: "Yanaca",
        province_id: "0304",
      },
      {
        id: "030501",
        name: "Tambobamba",
        province_id: "0305",
      },
      {
        id: "030502",
        name: "Cotabambas",
        province_id: "0305",
      },
      {
        id: "030503",
        name: "Coyllurqui",
        province_id: "0305",
      },
      {
        id: "030504",
        name: "Haquira",
        province_id: "0305",
      },
      {
        id: "030505",
        name: "Mara",
        province_id: "0305",
      },
      {
        id: "030506",
        name: "Challhuahuacho",
        province_id: "0305",
      },
      {
        id: "030601",
        name: "Chincheros",
        province_id: "0306",
      },
      {
        id: "030602",
        name: "Anco_Huallo",
        province_id: "0306",
      },
      {
        id: "030603",
        name: "Cocharcas",
        province_id: "0306",
      },
      {
        id: "030604",
        name: "Huaccana",
        province_id: "0306",
      },
      {
        id: "030605",
        name: "Ocobamba",
        province_id: "0306",
      },
      {
        id: "030606",
        name: "Ongoy",
        province_id: "0306",
      },
      {
        id: "030607",
        name: "Uranmarca",
        province_id: "0306",
      },
      {
        id: "030608",
        name: "Ranracancha",
        province_id: "0306",
      },
      {
        id: "030609",
        name: "Rocchacc",
        province_id: "0306",
      },
      {
        id: "030610",
        name: "El Porvenir",
        province_id: "0306",
      },
      {
        id: "030611",
        name: "Los Chankas",
        province_id: "0306",
      },
      {
        id: "030701",
        name: "Chuquibambilla",
        province_id: "0307",
      },
      {
        id: "030702",
        name: "Curpahuasi",
        province_id: "0307",
      },
      {
        id: "030703",
        name: "Gamarra",
        province_id: "0307",
      },
      {
        id: "030704",
        name: "Huayllati",
        province_id: "0307",
      },
      {
        id: "030705",
        name: "Mamara",
        province_id: "0307",
      },
      {
        id: "030706",
        name: "Micaela Bastidas",
        province_id: "0307",
      },
      {
        id: "030707",
        name: "Pataypampa",
        province_id: "0307",
      },
      {
        id: "030708",
        name: "Progreso",
        province_id: "0307",
      },
      {
        id: "030709",
        name: "San Antonio",
        province_id: "0307",
      },
      {
        id: "030710",
        name: "Santa Rosa",
        province_id: "0307",
      },
      {
        id: "030711",
        name: "Turpay",
        province_id: "0307",
      },
      {
        id: "030712",
        name: "Vilcabamba",
        province_id: "0307",
      },
      {
        id: "030713",
        name: "Virundo",
        province_id: "0307",
      },
      {
        id: "030714",
        name: "Curasco",
        province_id: "0307",
      },
      {
        id: "040101",
        name: "Arequipa",
        province_id: "0401",
      },
      {
        id: "040102",
        name: "Alto Selva Alegre",
        province_id: "0401",
      },
      {
        id: "040103",
        name: "Cayma",
        province_id: "0401",
      },
      {
        id: "040104",
        name: "Cerro Colorado",
        province_id: "0401",
      },
      {
        id: "040105",
        name: "Characato",
        province_id: "0401",
      },
      {
        id: "040106",
        name: "Chiguata",
        province_id: "0401",
      },
      {
        id: "040107",
        name: "Jacobo Hunter",
        province_id: "0401",
      },
      {
        id: "040108",
        name: "La Joya",
        province_id: "0401",
      },
      {
        id: "040109",
        name: "Mariano Melgar",
        province_id: "0401",
      },
      {
        id: "040110",
        name: "Miraflores",
        province_id: "0401",
      },
      {
        id: "040111",
        name: "Mollebaya",
        province_id: "0401",
      },
      {
        id: "040112",
        name: "Paucarpata",
        province_id: "0401",
      },
      {
        id: "040113",
        name: "Pocsi",
        province_id: "0401",
      },
      {
        id: "040114",
        name: "Polobaya",
        province_id: "0401",
      },
      {
        id: "040115",
        name: "Quequeña",
        province_id: "0401",
      },
      {
        id: "040116",
        name: "Sabandia",
        province_id: "0401",
      },
      {
        id: "040117",
        name: "Sachaca",
        province_id: "0401",
      },
      {
        id: "040118",
        name: "San Juan de Siguas",
        province_id: "0401",
      },
      {
        id: "040119",
        name: "San Juan de Tarucani",
        province_id: "0401",
      },
      {
        id: "040120",
        name: "Santa Isabel de Siguas",
        province_id: "0401",
      },
      {
        id: "040121",
        name: "Santa Rita de Siguas",
        province_id: "0401",
      },
      {
        id: "040122",
        name: "Socabaya",
        province_id: "0401",
      },
      {
        id: "040123",
        name: "Tiabaya",
        province_id: "0401",
      },
      {
        id: "040124",
        name: "Uchumayo",
        province_id: "0401",
      },
      {
        id: "040125",
        name: "Vitor",
        province_id: "0401",
      },
      {
        id: "040126",
        name: "Yanahuara",
        province_id: "0401",
      },
      {
        id: "040127",
        name: "Yarabamba",
        province_id: "0401",
      },
      {
        id: "040128",
        name: "Yura",
        province_id: "0401",
      },
      {
        id: "040129",
        name: "José Luis Bustamante Y Rivero",
        province_id: "0401",
      },
      {
        id: "040201",
        name: "Camaná",
        province_id: "0402",
      },
      {
        id: "040202",
        name: "José María Quimper",
        province_id: "0402",
      },
      {
        id: "040203",
        name: "Mariano Nicolás Valcárcel",
        province_id: "0402",
      },
      {
        id: "040204",
        name: "Mariscal Cáceres",
        province_id: "0402",
      },
      {
        id: "040205",
        name: "Nicolás de Pierola",
        province_id: "0402",
      },
      {
        id: "040206",
        name: "Ocoña",
        province_id: "0402",
      },
      {
        id: "040207",
        name: "Quilca",
        province_id: "0402",
      },
      {
        id: "040208",
        name: "Samuel Pastor",
        province_id: "0402",
      },
      {
        id: "040301",
        name: "Caravelí",
        province_id: "0403",
      },
      {
        id: "040302",
        name: "Acarí",
        province_id: "0403",
      },
      {
        id: "040303",
        name: "Atico",
        province_id: "0403",
      },
      {
        id: "040304",
        name: "Atiquipa",
        province_id: "0403",
      },
      {
        id: "040305",
        name: "Bella Unión",
        province_id: "0403",
      },
      {
        id: "040306",
        name: "Cahuacho",
        province_id: "0403",
      },
      {
        id: "040307",
        name: "Chala",
        province_id: "0403",
      },
      {
        id: "040308",
        name: "Chaparra",
        province_id: "0403",
      },
      {
        id: "040309",
        name: "Huanuhuanu",
        province_id: "0403",
      },
      {
        id: "040310",
        name: "Jaqui",
        province_id: "0403",
      },
      {
        id: "040311",
        name: "Lomas",
        province_id: "0403",
      },
      {
        id: "040312",
        name: "Quicacha",
        province_id: "0403",
      },
      {
        id: "040313",
        name: "Yauca",
        province_id: "0403",
      },
      {
        id: "040401",
        name: "Aplao",
        province_id: "0404",
      },
      {
        id: "040402",
        name: "Andagua",
        province_id: "0404",
      },
      {
        id: "040403",
        name: "Ayo",
        province_id: "0404",
      },
      {
        id: "040404",
        name: "Chachas",
        province_id: "0404",
      },
      {
        id: "040405",
        name: "Chilcaymarca",
        province_id: "0404",
      },
      {
        id: "040406",
        name: "Choco",
        province_id: "0404",
      },
      {
        id: "040407",
        name: "Huancarqui",
        province_id: "0404",
      },
      {
        id: "040408",
        name: "Machaguay",
        province_id: "0404",
      },
      {
        id: "040409",
        name: "Orcopampa",
        province_id: "0404",
      },
      {
        id: "040410",
        name: "Pampacolca",
        province_id: "0404",
      },
      {
        id: "040411",
        name: "Tipan",
        province_id: "0404",
      },
      {
        id: "040412",
        name: "Uñon",
        province_id: "0404",
      },
      {
        id: "040413",
        name: "Uraca",
        province_id: "0404",
      },
      {
        id: "040414",
        name: "Viraco",
        province_id: "0404",
      },
      {
        id: "040501",
        name: "Chivay",
        province_id: "0405",
      },
      {
        id: "040502",
        name: "Achoma",
        province_id: "0405",
      },
      {
        id: "040503",
        name: "Cabanaconde",
        province_id: "0405",
      },
      {
        id: "040504",
        name: "Callalli",
        province_id: "0405",
      },
      {
        id: "040505",
        name: "Caylloma",
        province_id: "0405",
      },
      {
        id: "040506",
        name: "Coporaque",
        province_id: "0405",
      },
      {
        id: "040507",
        name: "Huambo",
        province_id: "0405",
      },
      {
        id: "040508",
        name: "Huanca",
        province_id: "0405",
      },
      {
        id: "040509",
        name: "Ichupampa",
        province_id: "0405",
      },
      {
        id: "040510",
        name: "Lari",
        province_id: "0405",
      },
      {
        id: "040511",
        name: "Lluta",
        province_id: "0405",
      },
      {
        id: "040512",
        name: "Maca",
        province_id: "0405",
      },
      {
        id: "040513",
        name: "Madrigal",
        province_id: "0405",
      },
      {
        id: "040514",
        name: "San Antonio de Chuca",
        province_id: "0405",
      },
      {
        id: "040515",
        name: "Sibayo",
        province_id: "0405",
      },
      {
        id: "040516",
        name: "Tapay",
        province_id: "0405",
      },
      {
        id: "040517",
        name: "Tisco",
        province_id: "0405",
      },
      {
        id: "040518",
        name: "Tuti",
        province_id: "0405",
      },
      {
        id: "040519",
        name: "Yanque",
        province_id: "0405",
      },
      {
        id: "040520",
        name: "Majes",
        province_id: "0405",
      },
      {
        id: "040601",
        name: "Chuquibamba",
        province_id: "0406",
      },
      {
        id: "040602",
        name: "Andaray",
        province_id: "0406",
      },
      {
        id: "040603",
        name: "Cayarani",
        province_id: "0406",
      },
      {
        id: "040604",
        name: "Chichas",
        province_id: "0406",
      },
      {
        id: "040605",
        name: "Iray",
        province_id: "0406",
      },
      {
        id: "040606",
        name: "Río Grande",
        province_id: "0406",
      },
      {
        id: "040607",
        name: "Salamanca",
        province_id: "0406",
      },
      {
        id: "040608",
        name: "Yanaquihua",
        province_id: "0406",
      },
      {
        id: "040701",
        name: "Mollendo",
        province_id: "0407",
      },
      {
        id: "040702",
        name: "Cocachacra",
        province_id: "0407",
      },
      {
        id: "040703",
        name: "Dean Valdivia",
        province_id: "0407",
      },
      {
        id: "040704",
        name: "Islay",
        province_id: "0407",
      },
      {
        id: "040705",
        name: "Mejia",
        province_id: "0407",
      },
      {
        id: "040706",
        name: "Punta de Bombón",
        province_id: "0407",
      },
      {
        id: "040801",
        name: "Cotahuasi",
        province_id: "0408",
      },
      {
        id: "040802",
        name: "Alca",
        province_id: "0408",
      },
      {
        id: "040803",
        name: "Charcana",
        province_id: "0408",
      },
      {
        id: "040804",
        name: "Huaynacotas",
        province_id: "0408",
      },
      {
        id: "040805",
        name: "Pampamarca",
        province_id: "0408",
      },
      {
        id: "040806",
        name: "Puyca",
        province_id: "0408",
      },
      {
        id: "040807",
        name: "Quechualla",
        province_id: "0408",
      },
      {
        id: "040808",
        name: "Sayla",
        province_id: "0408",
      },
      {
        id: "040809",
        name: "Tauria",
        province_id: "0408",
      },
      {
        id: "040810",
        name: "Tomepampa",
        province_id: "0408",
      },
      {
        id: "040811",
        name: "Toro",
        province_id: "0408",
      },
      {
        id: "050101",
        name: "Ayacucho",
        province_id: "0501",
      },
      {
        id: "050102",
        name: "Acocro",
        province_id: "0501",
      },
      {
        id: "050103",
        name: "Acos Vinchos",
        province_id: "0501",
      },
      {
        id: "050104",
        name: "Carmen Alto",
        province_id: "0501",
      },
      {
        id: "050105",
        name: "Chiara",
        province_id: "0501",
      },
      {
        id: "050106",
        name: "Ocros",
        province_id: "0501",
      },
      {
        id: "050107",
        name: "Pacaycasa",
        province_id: "0501",
      },
      {
        id: "050108",
        name: "Quinua",
        province_id: "0501",
      },
      {
        id: "050109",
        name: "San José de Ticllas",
        province_id: "0501",
      },
      {
        id: "050110",
        name: "San Juan Bautista",
        province_id: "0501",
      },
      {
        id: "050111",
        name: "Santiago de Pischa",
        province_id: "0501",
      },
      {
        id: "050112",
        name: "Socos",
        province_id: "0501",
      },
      {
        id: "050113",
        name: "Tambillo",
        province_id: "0501",
      },
      {
        id: "050114",
        name: "Vinchos",
        province_id: "0501",
      },
      {
        id: "050115",
        name: "Jesús Nazareno",
        province_id: "0501",
      },
      {
        id: "050116",
        name: "Andrés Avelino Cáceres Dorregaray",
        province_id: "0501",
      },
      {
        id: "050201",
        name: "Cangallo",
        province_id: "0502",
      },
      {
        id: "050202",
        name: "Chuschi",
        province_id: "0502",
      },
      {
        id: "050203",
        name: "Los Morochucos",
        province_id: "0502",
      },
      {
        id: "050204",
        name: "María Parado de Bellido",
        province_id: "0502",
      },
      {
        id: "050205",
        name: "Paras",
        province_id: "0502",
      },
      {
        id: "050206",
        name: "Totos",
        province_id: "0502",
      },
      {
        id: "050301",
        name: "Sancos",
        province_id: "0503",
      },
      {
        id: "050302",
        name: "Carapo",
        province_id: "0503",
      },
      {
        id: "050303",
        name: "Sacsamarca",
        province_id: "0503",
      },
      {
        id: "050304",
        name: "Santiago de Lucanamarca",
        province_id: "0503",
      },
      {
        id: "050401",
        name: "Huanta",
        province_id: "0504",
      },
      {
        id: "050402",
        name: "Ayahuanco",
        province_id: "0504",
      },
      {
        id: "050403",
        name: "Huamanguilla",
        province_id: "0504",
      },
      {
        id: "050404",
        name: "Iguain",
        province_id: "0504",
      },
      {
        id: "050405",
        name: "Luricocha",
        province_id: "0504",
      },
      {
        id: "050406",
        name: "Santillana",
        province_id: "0504",
      },
      {
        id: "050407",
        name: "Sivia",
        province_id: "0504",
      },
      {
        id: "050408",
        name: "Llochegua",
        province_id: "0504",
      },
      {
        id: "050409",
        name: "Canayre",
        province_id: "0504",
      },
      {
        id: "050410",
        name: "Uchuraccay",
        province_id: "0504",
      },
      {
        id: "050411",
        name: "Pucacolpa",
        province_id: "0504",
      },
      {
        id: "050412",
        name: "Chaca",
        province_id: "0504",
      },
      {
        id: "050501",
        name: "San Miguel",
        province_id: "0505",
      },
      {
        id: "050502",
        name: "Anco",
        province_id: "0505",
      },
      {
        id: "050503",
        name: "Ayna",
        province_id: "0505",
      },
      {
        id: "050504",
        name: "Chilcas",
        province_id: "0505",
      },
      {
        id: "050505",
        name: "Chungui",
        province_id: "0505",
      },
      {
        id: "050506",
        name: "Luis Carranza",
        province_id: "0505",
      },
      {
        id: "050507",
        name: "Santa Rosa",
        province_id: "0505",
      },
      {
        id: "050508",
        name: "Tambo",
        province_id: "0505",
      },
      {
        id: "050509",
        name: "Samugari",
        province_id: "0505",
      },
      {
        id: "050510",
        name: "Anchihuay",
        province_id: "0505",
      },
      {
        id: "050511",
        name: "Oronccoy",
        province_id: "0505",
      },
      {
        id: "050601",
        name: "Puquio",
        province_id: "0506",
      },
      {
        id: "050602",
        name: "Aucara",
        province_id: "0506",
      },
      {
        id: "050603",
        name: "Cabana",
        province_id: "0506",
      },
      {
        id: "050604",
        name: "Carmen Salcedo",
        province_id: "0506",
      },
      {
        id: "050605",
        name: "Chaviña",
        province_id: "0506",
      },
      {
        id: "050606",
        name: "Chipao",
        province_id: "0506",
      },
      {
        id: "050607",
        name: "Huac-Huas",
        province_id: "0506",
      },
      {
        id: "050608",
        name: "Laramate",
        province_id: "0506",
      },
      {
        id: "050609",
        name: "Leoncio Prado",
        province_id: "0506",
      },
      {
        id: "050610",
        name: "Llauta",
        province_id: "0506",
      },
      {
        id: "050611",
        name: "Lucanas",
        province_id: "0506",
      },
      {
        id: "050612",
        name: "Ocaña",
        province_id: "0506",
      },
      {
        id: "050613",
        name: "Otoca",
        province_id: "0506",
      },
      {
        id: "050614",
        name: "Saisa",
        province_id: "0506",
      },
      {
        id: "050615",
        name: "San Cristóbal",
        province_id: "0506",
      },
      {
        id: "050616",
        name: "San Juan",
        province_id: "0506",
      },
      {
        id: "050617",
        name: "San Pedro",
        province_id: "0506",
      },
      {
        id: "050618",
        name: "San Pedro de Palco",
        province_id: "0506",
      },
      {
        id: "050619",
        name: "Sancos",
        province_id: "0506",
      },
      {
        id: "050620",
        name: "Santa Ana de Huaycahuacho",
        province_id: "0506",
      },
      {
        id: "050621",
        name: "Santa Lucia",
        province_id: "0506",
      },
      {
        id: "050701",
        name: "Coracora",
        province_id: "0507",
      },
      {
        id: "050702",
        name: "Chumpi",
        province_id: "0507",
      },
      {
        id: "050703",
        name: "Coronel Castañeda",
        province_id: "0507",
      },
      {
        id: "050704",
        name: "Pacapausa",
        province_id: "0507",
      },
      {
        id: "050705",
        name: "Pullo",
        province_id: "0507",
      },
      {
        id: "050706",
        name: "Puyusca",
        province_id: "0507",
      },
      {
        id: "050707",
        name: "San Francisco de Ravacayco",
        province_id: "0507",
      },
      {
        id: "050708",
        name: "Upahuacho",
        province_id: "0507",
      },
      {
        id: "050801",
        name: "Pausa",
        province_id: "0508",
      },
      {
        id: "050802",
        name: "Colta",
        province_id: "0508",
      },
      {
        id: "050803",
        name: "Corculla",
        province_id: "0508",
      },
      {
        id: "050804",
        name: "Lampa",
        province_id: "0508",
      },
      {
        id: "050805",
        name: "Marcabamba",
        province_id: "0508",
      },
      {
        id: "050806",
        name: "Oyolo",
        province_id: "0508",
      },
      {
        id: "050807",
        name: "Pararca",
        province_id: "0508",
      },
      {
        id: "050808",
        name: "San Javier de Alpabamba",
        province_id: "0508",
      },
      {
        id: "050809",
        name: "San José de Ushua",
        province_id: "0508",
      },
      {
        id: "050810",
        name: "Sara Sara",
        province_id: "0508",
      },
      {
        id: "050901",
        name: "Querobamba",
        province_id: "0509",
      },
      {
        id: "050902",
        name: "Belén",
        province_id: "0509",
      },
      {
        id: "050903",
        name: "Chalcos",
        province_id: "0509",
      },
      {
        id: "050904",
        name: "Chilcayoc",
        province_id: "0509",
      },
      {
        id: "050905",
        name: "Huacaña",
        province_id: "0509",
      },
      {
        id: "050906",
        name: "Morcolla",
        province_id: "0509",
      },
      {
        id: "050907",
        name: "Paico",
        province_id: "0509",
      },
      {
        id: "050908",
        name: "San Pedro de Larcay",
        province_id: "0509",
      },
      {
        id: "050909",
        name: "San Salvador de Quije",
        province_id: "0509",
      },
      {
        id: "050910",
        name: "Santiago de Paucaray",
        province_id: "0509",
      },
      {
        id: "050911",
        name: "Soras",
        province_id: "0509",
      },
      {
        id: "051001",
        name: "Huancapi",
        province_id: "0510",
      },
      {
        id: "051002",
        name: "Alcamenca",
        province_id: "0510",
      },
      {
        id: "051003",
        name: "Apongo",
        province_id: "0510",
      },
      {
        id: "051004",
        name: "Asquipata",
        province_id: "0510",
      },
      {
        id: "051005",
        name: "Canaria",
        province_id: "0510",
      },
      {
        id: "051006",
        name: "Cayara",
        province_id: "0510",
      },
      {
        id: "051007",
        name: "Colca",
        province_id: "0510",
      },
      {
        id: "051008",
        name: "Huamanquiquia",
        province_id: "0510",
      },
      {
        id: "051009",
        name: "Huancaraylla",
        province_id: "0510",
      },
      {
        id: "051010",
        name: "Hualla",
        province_id: "0510",
      },
      {
        id: "051011",
        name: "Sarhua",
        province_id: "0510",
      },
      {
        id: "051012",
        name: "Vilcanchos",
        province_id: "0510",
      },
      {
        id: "051101",
        name: "Vilcas Huaman",
        province_id: "0511",
      },
      {
        id: "051102",
        name: "Accomarca",
        province_id: "0511",
      },
      {
        id: "051103",
        name: "Carhuanca",
        province_id: "0511",
      },
      {
        id: "051104",
        name: "Concepción",
        province_id: "0511",
      },
      {
        id: "051105",
        name: "Huambalpa",
        province_id: "0511",
      },
      {
        id: "051106",
        name: "Independencia",
        province_id: "0511",
      },
      {
        id: "051107",
        name: "Saurama",
        province_id: "0511",
      },
      {
        id: "051108",
        name: "Vischongo",
        province_id: "0511",
      },
      {
        id: "060101",
        name: "Cajamarca",
        province_id: "0601",
      },
      {
        id: "060102",
        name: "Asunción",
        province_id: "0601",
      },
      {
        id: "060103",
        name: "Chetilla",
        province_id: "0601",
      },
      {
        id: "060104",
        name: "Cospan",
        province_id: "0601",
      },
      {
        id: "060105",
        name: "Encañada",
        province_id: "0601",
      },
      {
        id: "060106",
        name: "Jesús",
        province_id: "0601",
      },
      {
        id: "060107",
        name: "Llacanora",
        province_id: "0601",
      },
      {
        id: "060108",
        name: "Los Baños del Inca",
        province_id: "0601",
      },
      {
        id: "060109",
        name: "Magdalena",
        province_id: "0601",
      },
      {
        id: "060110",
        name: "Matara",
        province_id: "0601",
      },
      {
        id: "060111",
        name: "Namora",
        province_id: "0601",
      },
      {
        id: "060112",
        name: "San Juan",
        province_id: "0601",
      },
      {
        id: "060201",
        name: "Cajabamba",
        province_id: "0602",
      },
      {
        id: "060202",
        name: "Cachachi",
        province_id: "0602",
      },
      {
        id: "060203",
        name: "Condebamba",
        province_id: "0602",
      },
      {
        id: "060204",
        name: "Sitacocha",
        province_id: "0602",
      },
      {
        id: "060301",
        name: "Celendín",
        province_id: "0603",
      },
      {
        id: "060302",
        name: "Chumuch",
        province_id: "0603",
      },
      {
        id: "060303",
        name: "Cortegana",
        province_id: "0603",
      },
      {
        id: "060304",
        name: "Huasmin",
        province_id: "0603",
      },
      {
        id: "060305",
        name: "Jorge Chávez",
        province_id: "0603",
      },
      {
        id: "060306",
        name: "José Gálvez",
        province_id: "0603",
      },
      {
        id: "060307",
        name: "Miguel Iglesias",
        province_id: "0603",
      },
      {
        id: "060308",
        name: "Oxamarca",
        province_id: "0603",
      },
      {
        id: "060309",
        name: "Sorochuco",
        province_id: "0603",
      },
      {
        id: "060310",
        name: "Sucre",
        province_id: "0603",
      },
      {
        id: "060311",
        name: "Utco",
        province_id: "0603",
      },
      {
        id: "060312",
        name: "La Libertad de Pallan",
        province_id: "0603",
      },
      {
        id: "060401",
        name: "Chota",
        province_id: "0604",
      },
      {
        id: "060402",
        name: "Anguia",
        province_id: "0604",
      },
      {
        id: "060403",
        name: "Chadin",
        province_id: "0604",
      },
      {
        id: "060404",
        name: "Chiguirip",
        province_id: "0604",
      },
      {
        id: "060405",
        name: "Chimban",
        province_id: "0604",
      },
      {
        id: "060406",
        name: "Choropampa",
        province_id: "0604",
      },
      {
        id: "060407",
        name: "Cochabamba",
        province_id: "0604",
      },
      {
        id: "060408",
        name: "Conchan",
        province_id: "0604",
      },
      {
        id: "060409",
        name: "Huambos",
        province_id: "0604",
      },
      {
        id: "060410",
        name: "Lajas",
        province_id: "0604",
      },
      {
        id: "060411",
        name: "Llama",
        province_id: "0604",
      },
      {
        id: "060412",
        name: "Miracosta",
        province_id: "0604",
      },
      {
        id: "060413",
        name: "Paccha",
        province_id: "0604",
      },
      {
        id: "060414",
        name: "Pion",
        province_id: "0604",
      },
      {
        id: "060415",
        name: "Querocoto",
        province_id: "0604",
      },
      {
        id: "060416",
        name: "San Juan de Licupis",
        province_id: "0604",
      },
      {
        id: "060417",
        name: "Tacabamba",
        province_id: "0604",
      },
      {
        id: "060418",
        name: "Tocmoche",
        province_id: "0604",
      },
      {
        id: "060419",
        name: "Chalamarca",
        province_id: "0604",
      },
      {
        id: "060501",
        name: "Contumaza",
        province_id: "0605",
      },
      {
        id: "060502",
        name: "Chilete",
        province_id: "0605",
      },
      {
        id: "060503",
        name: "Cupisnique",
        province_id: "0605",
      },
      {
        id: "060504",
        name: "Guzmango",
        province_id: "0605",
      },
      {
        id: "060505",
        name: "San Benito",
        province_id: "0605",
      },
      {
        id: "060506",
        name: "Santa Cruz de Toledo",
        province_id: "0605",
      },
      {
        id: "060507",
        name: "Tantarica",
        province_id: "0605",
      },
      {
        id: "060508",
        name: "Yonan",
        province_id: "0605",
      },
      {
        id: "060601",
        name: "Cutervo",
        province_id: "0606",
      },
      {
        id: "060602",
        name: "Callayuc",
        province_id: "0606",
      },
      {
        id: "060603",
        name: "Choros",
        province_id: "0606",
      },
      {
        id: "060604",
        name: "Cujillo",
        province_id: "0606",
      },
      {
        id: "060605",
        name: "La Ramada",
        province_id: "0606",
      },
      {
        id: "060606",
        name: "Pimpingos",
        province_id: "0606",
      },
      {
        id: "060607",
        name: "Querocotillo",
        province_id: "0606",
      },
      {
        id: "060608",
        name: "San Andrés de Cutervo",
        province_id: "0606",
      },
      {
        id: "060609",
        name: "San Juan de Cutervo",
        province_id: "0606",
      },
      {
        id: "060610",
        name: "San Luis de Lucma",
        province_id: "0606",
      },
      {
        id: "060611",
        name: "Santa Cruz",
        province_id: "0606",
      },
      {
        id: "060612",
        name: "Santo Domingo de la Capilla",
        province_id: "0606",
      },
      {
        id: "060613",
        name: "Santo Tomas",
        province_id: "0606",
      },
      {
        id: "060614",
        name: "Socota",
        province_id: "0606",
      },
      {
        id: "060615",
        name: "Toribio Casanova",
        province_id: "0606",
      },
      {
        id: "060701",
        name: "Bambamarca",
        province_id: "0607",
      },
      {
        id: "060702",
        name: "Chugur",
        province_id: "0607",
      },
      {
        id: "060703",
        name: "Hualgayoc",
        province_id: "0607",
      },
      {
        id: "060801",
        name: "Jaén",
        province_id: "0608",
      },
      {
        id: "060802",
        name: "Bellavista",
        province_id: "0608",
      },
      {
        id: "060803",
        name: "Chontali",
        province_id: "0608",
      },
      {
        id: "060804",
        name: "Colasay",
        province_id: "0608",
      },
      {
        id: "060805",
        name: "Huabal",
        province_id: "0608",
      },
      {
        id: "060806",
        name: "Las Pirias",
        province_id: "0608",
      },
      {
        id: "060807",
        name: "Pomahuaca",
        province_id: "0608",
      },
      {
        id: "060808",
        name: "Pucara",
        province_id: "0608",
      },
      {
        id: "060809",
        name: "Sallique",
        province_id: "0608",
      },
      {
        id: "060810",
        name: "San Felipe",
        province_id: "0608",
      },
      {
        id: "060811",
        name: "San José del Alto",
        province_id: "0608",
      },
      {
        id: "060812",
        name: "Santa Rosa",
        province_id: "0608",
      },
      {
        id: "060901",
        name: "San Ignacio",
        province_id: "0609",
      },
      {
        id: "060902",
        name: "Chirinos",
        province_id: "0609",
      },
      {
        id: "060903",
        name: "Huarango",
        province_id: "0609",
      },
      {
        id: "060904",
        name: "La Coipa",
        province_id: "0609",
      },
      {
        id: "060905",
        name: "Namballe",
        province_id: "0609",
      },
      {
        id: "060906",
        name: "San José de Lourdes",
        province_id: "0609",
      },
      {
        id: "060907",
        name: "Tabaconas",
        province_id: "0609",
      },
      {
        id: "061001",
        name: "Pedro Gálvez",
        province_id: "0610",
      },
      {
        id: "061002",
        name: "Chancay",
        province_id: "0610",
      },
      {
        id: "061003",
        name: "Eduardo Villanueva",
        province_id: "0610",
      },
      {
        id: "061004",
        name: "Gregorio Pita",
        province_id: "0610",
      },
      {
        id: "061005",
        name: "Ichocan",
        province_id: "0610",
      },
      {
        id: "061006",
        name: "José Manuel Quiroz",
        province_id: "0610",
      },
      {
        id: "061007",
        name: "José Sabogal",
        province_id: "0610",
      },
      {
        id: "061101",
        name: "San Miguel",
        province_id: "0611",
      },
      {
        id: "061102",
        name: "Bolívar",
        province_id: "0611",
      },
      {
        id: "061103",
        name: "Calquis",
        province_id: "0611",
      },
      {
        id: "061104",
        name: "Catilluc",
        province_id: "0611",
      },
      {
        id: "061105",
        name: "El Prado",
        province_id: "0611",
      },
      {
        id: "061106",
        name: "La Florida",
        province_id: "0611",
      },
      {
        id: "061107",
        name: "Llapa",
        province_id: "0611",
      },
      {
        id: "061108",
        name: "Nanchoc",
        province_id: "0611",
      },
      {
        id: "061109",
        name: "Niepos",
        province_id: "0611",
      },
      {
        id: "061110",
        name: "San Gregorio",
        province_id: "0611",
      },
      {
        id: "061111",
        name: "San Silvestre de Cochan",
        province_id: "0611",
      },
      {
        id: "061112",
        name: "Tongod",
        province_id: "0611",
      },
      {
        id: "061113",
        name: "Unión Agua Blanca",
        province_id: "0611",
      },
      {
        id: "061201",
        name: "San Pablo",
        province_id: "0612",
      },
      {
        id: "061202",
        name: "San Bernardino",
        province_id: "0612",
      },
      {
        id: "061203",
        name: "San Luis",
        province_id: "0612",
      },
      {
        id: "061204",
        name: "Tumbaden",
        province_id: "0612",
      },
      {
        id: "061301",
        name: "Santa Cruz",
        province_id: "0613",
      },
      {
        id: "061302",
        name: "Andabamba",
        province_id: "0613",
      },
      {
        id: "061303",
        name: "Catache",
        province_id: "0613",
      },
      {
        id: "061304",
        name: "Chancaybaños",
        province_id: "0613",
      },
      {
        id: "061305",
        name: "La Esperanza",
        province_id: "0613",
      },
      {
        id: "061306",
        name: "Ninabamba",
        province_id: "0613",
      },
      {
        id: "061307",
        name: "Pulan",
        province_id: "0613",
      },
      {
        id: "061308",
        name: "Saucepampa",
        province_id: "0613",
      },
      {
        id: "061309",
        name: "Sexi",
        province_id: "0613",
      },
      {
        id: "061310",
        name: "Uticyacu",
        province_id: "0613",
      },
      {
        id: "061311",
        name: "Yauyucan",
        province_id: "0613",
      },
      {
        id: "070101",
        name: "Callao",
        province_id: "0701",
      },
      {
        id: "070102",
        name: "Bellavista",
        province_id: "0701",
      },
      {
        id: "070103",
        name: "Carmen de la Legua Reynoso",
        province_id: "0701",
      },
      {
        id: "070104",
        name: "La Perla",
        province_id: "0701",
      },
      {
        id: "070105",
        name: "La Punta",
        province_id: "0701",
      },
      {
        id: "070106",
        name: "Ventanilla",
        province_id: "0701",
      },
      {
        id: "070107",
        name: "Mi Perú",
        province_id: "0701",
      },
      {
        id: "080101",
        name: "Cusco",
        province_id: "0801",
      },
      {
        id: "080102",
        name: "Ccorca",
        province_id: "0801",
      },
      {
        id: "080103",
        name: "Poroy",
        province_id: "0801",
      },
      {
        id: "080104",
        name: "San Jerónimo",
        province_id: "0801",
      },
      {
        id: "080105",
        name: "San Sebastian",
        province_id: "0801",
      },
      {
        id: "080106",
        name: "Santiago",
        province_id: "0801",
      },
      {
        id: "080107",
        name: "Saylla",
        province_id: "0801",
      },
      {
        id: "080108",
        name: "Wanchaq",
        province_id: "0801",
      },
      {
        id: "080201",
        name: "Acomayo",
        province_id: "0802",
      },
      {
        id: "080202",
        name: "Acopia",
        province_id: "0802",
      },
      {
        id: "080203",
        name: "Acos",
        province_id: "0802",
      },
      {
        id: "080204",
        name: "Mosoc Llacta",
        province_id: "0802",
      },
      {
        id: "080205",
        name: "Pomacanchi",
        province_id: "0802",
      },
      {
        id: "080206",
        name: "Rondocan",
        province_id: "0802",
      },
      {
        id: "080207",
        name: "Sangarara",
        province_id: "0802",
      },
      {
        id: "080301",
        name: "Anta",
        province_id: "0803",
      },
      {
        id: "080302",
        name: "Ancahuasi",
        province_id: "0803",
      },
      {
        id: "080303",
        name: "Cachimayo",
        province_id: "0803",
      },
      {
        id: "080304",
        name: "Chinchaypujio",
        province_id: "0803",
      },
      {
        id: "080305",
        name: "Huarocondo",
        province_id: "0803",
      },
      {
        id: "080306",
        name: "Limatambo",
        province_id: "0803",
      },
      {
        id: "080307",
        name: "Mollepata",
        province_id: "0803",
      },
      {
        id: "080308",
        name: "Pucyura",
        province_id: "0803",
      },
      {
        id: "080309",
        name: "Zurite",
        province_id: "0803",
      },
      {
        id: "080401",
        name: "Calca",
        province_id: "0804",
      },
      {
        id: "080402",
        name: "Coya",
        province_id: "0804",
      },
      {
        id: "080403",
        name: "Lamay",
        province_id: "0804",
      },
      {
        id: "080404",
        name: "Lares",
        province_id: "0804",
      },
      {
        id: "080405",
        name: "Pisac",
        province_id: "0804",
      },
      {
        id: "080406",
        name: "San Salvador",
        province_id: "0804",
      },
      {
        id: "080407",
        name: "Taray",
        province_id: "0804",
      },
      {
        id: "080408",
        name: "Yanatile",
        province_id: "0804",
      },
      {
        id: "080501",
        name: "Yanaoca",
        province_id: "0805",
      },
      {
        id: "080502",
        name: "Checca",
        province_id: "0805",
      },
      {
        id: "080503",
        name: "Kunturkanki",
        province_id: "0805",
      },
      {
        id: "080504",
        name: "Langui",
        province_id: "0805",
      },
      {
        id: "080505",
        name: "Layo",
        province_id: "0805",
      },
      {
        id: "080506",
        name: "Pampamarca",
        province_id: "0805",
      },
      {
        id: "080507",
        name: "Quehue",
        province_id: "0805",
      },
      {
        id: "080508",
        name: "Tupac Amaru",
        province_id: "0805",
      },
      {
        id: "080601",
        name: "Sicuani",
        province_id: "0806",
      },
      {
        id: "080602",
        name: "Checacupe",
        province_id: "0806",
      },
      {
        id: "080603",
        name: "Combapata",
        province_id: "0806",
      },
      {
        id: "080604",
        name: "Marangani",
        province_id: "0806",
      },
      {
        id: "080605",
        name: "Pitumarca",
        province_id: "0806",
      },
      {
        id: "080606",
        name: "San Pablo",
        province_id: "0806",
      },
      {
        id: "080607",
        name: "San Pedro",
        province_id: "0806",
      },
      {
        id: "080608",
        name: "Tinta",
        province_id: "0806",
      },
      {
        id: "080701",
        name: "Santo Tomas",
        province_id: "0807",
      },
      {
        id: "080702",
        name: "Capacmarca",
        province_id: "0807",
      },
      {
        id: "080703",
        name: "Chamaca",
        province_id: "0807",
      },
      {
        id: "080704",
        name: "Colquemarca",
        province_id: "0807",
      },
      {
        id: "080705",
        name: "Livitaca",
        province_id: "0807",
      },
      {
        id: "080706",
        name: "Llusco",
        province_id: "0807",
      },
      {
        id: "080707",
        name: "Quiñota",
        province_id: "0807",
      },
      {
        id: "080708",
        name: "Velille",
        province_id: "0807",
      },
      {
        id: "080801",
        name: "Espinar",
        province_id: "0808",
      },
      {
        id: "080802",
        name: "Condoroma",
        province_id: "0808",
      },
      {
        id: "080803",
        name: "Coporaque",
        province_id: "0808",
      },
      {
        id: "080804",
        name: "Ocoruro",
        province_id: "0808",
      },
      {
        id: "080805",
        name: "Pallpata",
        province_id: "0808",
      },
      {
        id: "080806",
        name: "Pichigua",
        province_id: "0808",
      },
      {
        id: "080807",
        name: "Suyckutambo",
        province_id: "0808",
      },
      {
        id: "080808",
        name: "Alto Pichigua",
        province_id: "0808",
      },
      {
        id: "080901",
        name: "Santa Ana",
        province_id: "0809",
      },
      {
        id: "080902",
        name: "Echarate",
        province_id: "0809",
      },
      {
        id: "080903",
        name: "Huayopata",
        province_id: "0809",
      },
      {
        id: "080904",
        name: "Maranura",
        province_id: "0809",
      },
      {
        id: "080905",
        name: "Ocobamba",
        province_id: "0809",
      },
      {
        id: "080906",
        name: "Quellouno",
        province_id: "0809",
      },
      {
        id: "080907",
        name: "Kimbiri",
        province_id: "0809",
      },
      {
        id: "080908",
        name: "Santa Teresa",
        province_id: "0809",
      },
      {
        id: "080909",
        name: "Vilcabamba",
        province_id: "0809",
      },
      {
        id: "080910",
        name: "Pichari",
        province_id: "0809",
      },
      {
        id: "080911",
        name: "Inkawasi",
        province_id: "0809",
      },
      {
        id: "080912",
        name: "Villa Virgen",
        province_id: "0809",
      },
      {
        id: "080913",
        name: "Villa Kintiarina",
        province_id: "0809",
      },
      {
        id: "080914",
        name: "Megantoni",
        province_id: "0809",
      },
      {
        id: "081001",
        name: "Paruro",
        province_id: "0810",
      },
      {
        id: "081002",
        name: "Accha",
        province_id: "0810",
      },
      {
        id: "081003",
        name: "Ccapi",
        province_id: "0810",
      },
      {
        id: "081004",
        name: "Colcha",
        province_id: "0810",
      },
      {
        id: "081005",
        name: "Huanoquite",
        province_id: "0810",
      },
      {
        id: "081006",
        name: "Omachaç",
        province_id: "0810",
      },
      {
        id: "081007",
        name: "Paccaritambo",
        province_id: "0810",
      },
      {
        id: "081008",
        name: "Pillpinto",
        province_id: "0810",
      },
      {
        id: "081009",
        name: "Yaurisque",
        province_id: "0810",
      },
      {
        id: "081101",
        name: "Paucartambo",
        province_id: "0811",
      },
      {
        id: "081102",
        name: "Caicay",
        province_id: "0811",
      },
      {
        id: "081103",
        name: "Challabamba",
        province_id: "0811",
      },
      {
        id: "081104",
        name: "Colquepata",
        province_id: "0811",
      },
      {
        id: "081105",
        name: "Huancarani",
        province_id: "0811",
      },
      {
        id: "081106",
        name: "Kosñipata",
        province_id: "0811",
      },
      {
        id: "081201",
        name: "Urcos",
        province_id: "0812",
      },
      {
        id: "081202",
        name: "Andahuaylillas",
        province_id: "0812",
      },
      {
        id: "081203",
        name: "Camanti",
        province_id: "0812",
      },
      {
        id: "081204",
        name: "Ccarhuayo",
        province_id: "0812",
      },
      {
        id: "081205",
        name: "Ccatca",
        province_id: "0812",
      },
      {
        id: "081206",
        name: "Cusipata",
        province_id: "0812",
      },
      {
        id: "081207",
        name: "Huaro",
        province_id: "0812",
      },
      {
        id: "081208",
        name: "Lucre",
        province_id: "0812",
      },
      {
        id: "081209",
        name: "Marcapata",
        province_id: "0812",
      },
      {
        id: "081210",
        name: "Ocongate",
        province_id: "0812",
      },
      {
        id: "081211",
        name: "Oropesa",
        province_id: "0812",
      },
      {
        id: "081212",
        name: "Quiquijana",
        province_id: "0812",
      },
      {
        id: "081301",
        name: "Urubamba",
        province_id: "0813",
      },
      {
        id: "081302",
        name: "Chinchero",
        province_id: "0813",
      },
      {
        id: "081303",
        name: "Huayllabamba",
        province_id: "0813",
      },
      {
        id: "081304",
        name: "Machupicchu",
        province_id: "0813",
      },
      {
        id: "081305",
        name: "Maras",
        province_id: "0813",
      },
      {
        id: "081306",
        name: "Ollantaytambo",
        province_id: "0813",
      },
      {
        id: "081307",
        name: "Yucay",
        province_id: "0813",
      },
      {
        id: "090101",
        name: "Huancavelica",
        province_id: "0901",
      },
      {
        id: "090102",
        name: "Acobambilla",
        province_id: "0901",
      },
      {
        id: "090103",
        name: "Acoria",
        province_id: "0901",
      },
      {
        id: "090104",
        name: "Conayca",
        province_id: "0901",
      },
      {
        id: "090105",
        name: "Cuenca",
        province_id: "0901",
      },
      {
        id: "090106",
        name: "Huachocolpa",
        province_id: "0901",
      },
      {
        id: "090107",
        name: "Huayllahuara",
        province_id: "0901",
      },
      {
        id: "090108",
        name: "Izcuchaca",
        province_id: "0901",
      },
      {
        id: "090109",
        name: "Laria",
        province_id: "0901",
      },
      {
        id: "090110",
        name: "Manta",
        province_id: "0901",
      },
      {
        id: "090111",
        name: "Mariscal Cáceres",
        province_id: "0901",
      },
      {
        id: "090112",
        name: "Moya",
        province_id: "0901",
      },
      {
        id: "090113",
        name: "Nuevo Occoro",
        province_id: "0901",
      },
      {
        id: "090114",
        name: "Palca",
        province_id: "0901",
      },
      {
        id: "090115",
        name: "Pilchaca",
        province_id: "0901",
      },
      {
        id: "090116",
        name: "Vilca",
        province_id: "0901",
      },
      {
        id: "090117",
        name: "Yauli",
        province_id: "0901",
      },
      {
        id: "090118",
        name: "Ascensión",
        province_id: "0901",
      },
      {
        id: "090119",
        name: "Huando",
        province_id: "0901",
      },
      {
        id: "090201",
        name: "Acobamba",
        province_id: "0902",
      },
      {
        id: "090202",
        name: "Andabamba",
        province_id: "0902",
      },
      {
        id: "090203",
        name: "Anta",
        province_id: "0902",
      },
      {
        id: "090204",
        name: "Caja",
        province_id: "0902",
      },
      {
        id: "090205",
        name: "Marcas",
        province_id: "0902",
      },
      {
        id: "090206",
        name: "Paucara",
        province_id: "0902",
      },
      {
        id: "090207",
        name: "Pomacocha",
        province_id: "0902",
      },
      {
        id: "090208",
        name: "Rosario",
        province_id: "0902",
      },
      {
        id: "090301",
        name: "Lircay",
        province_id: "0903",
      },
      {
        id: "090302",
        name: "Anchonga",
        province_id: "0903",
      },
      {
        id: "090303",
        name: "Callanmarca",
        province_id: "0903",
      },
      {
        id: "090304",
        name: "Ccochaccasa",
        province_id: "0903",
      },
      {
        id: "090305",
        name: "Chincho",
        province_id: "0903",
      },
      {
        id: "090306",
        name: "Congalla",
        province_id: "0903",
      },
      {
        id: "090307",
        name: "Huanca-Huanca",
        province_id: "0903",
      },
      {
        id: "090308",
        name: "Huayllay Grande",
        province_id: "0903",
      },
      {
        id: "090309",
        name: "Julcamarca",
        province_id: "0903",
      },
      {
        id: "090310",
        name: "San Antonio de Antaparco",
        province_id: "0903",
      },
      {
        id: "090311",
        name: "Santo Tomas de Pata",
        province_id: "0903",
      },
      {
        id: "090312",
        name: "Secclla",
        province_id: "0903",
      },
      {
        id: "090401",
        name: "Castrovirreyna",
        province_id: "0904",
      },
      {
        id: "090402",
        name: "Arma",
        province_id: "0904",
      },
      {
        id: "090403",
        name: "Aurahua",
        province_id: "0904",
      },
      {
        id: "090404",
        name: "Capillas",
        province_id: "0904",
      },
      {
        id: "090405",
        name: "Chupamarca",
        province_id: "0904",
      },
      {
        id: "090406",
        name: "Cocas",
        province_id: "0904",
      },
      {
        id: "090407",
        name: "Huachos",
        province_id: "0904",
      },
      {
        id: "090408",
        name: "Huamatambo",
        province_id: "0904",
      },
      {
        id: "090409",
        name: "Mollepampa",
        province_id: "0904",
      },
      {
        id: "090410",
        name: "San Juan",
        province_id: "0904",
      },
      {
        id: "090411",
        name: "Santa Ana",
        province_id: "0904",
      },
      {
        id: "090412",
        name: "Tantara",
        province_id: "0904",
      },
      {
        id: "090413",
        name: "Ticrapo",
        province_id: "0904",
      },
      {
        id: "090501",
        name: "Churcampa",
        province_id: "0905",
      },
      {
        id: "090502",
        name: "Anco",
        province_id: "0905",
      },
      {
        id: "090503",
        name: "Chinchihuasi",
        province_id: "0905",
      },
      {
        id: "090504",
        name: "El Carmen",
        province_id: "0905",
      },
      {
        id: "090505",
        name: "La Merced",
        province_id: "0905",
      },
      {
        id: "090506",
        name: "Locroja",
        province_id: "0905",
      },
      {
        id: "090507",
        name: "Paucarbamba",
        province_id: "0905",
      },
      {
        id: "090508",
        name: "San Miguel de Mayocc",
        province_id: "0905",
      },
      {
        id: "090509",
        name: "San Pedro de Coris",
        province_id: "0905",
      },
      {
        id: "090510",
        name: "Pachamarca",
        province_id: "0905",
      },
      {
        id: "090511",
        name: "Cosme",
        province_id: "0905",
      },
      {
        id: "090601",
        name: "Huaytara",
        province_id: "0906",
      },
      {
        id: "090602",
        name: "Ayavi",
        province_id: "0906",
      },
      {
        id: "090603",
        name: "Córdova",
        province_id: "0906",
      },
      {
        id: "090604",
        name: "Huayacundo Arma",
        province_id: "0906",
      },
      {
        id: "090605",
        name: "Laramarca",
        province_id: "0906",
      },
      {
        id: "090606",
        name: "Ocoyo",
        province_id: "0906",
      },
      {
        id: "090607",
        name: "Pilpichaca",
        province_id: "0906",
      },
      {
        id: "090608",
        name: "Querco",
        province_id: "0906",
      },
      {
        id: "090609",
        name: "Quito-Arma",
        province_id: "0906",
      },
      {
        id: "090610",
        name: "San Antonio de Cusicancha",
        province_id: "0906",
      },
      {
        id: "090611",
        name: "San Francisco de Sangayaico",
        province_id: "0906",
      },
      {
        id: "090612",
        name: "San Isidro",
        province_id: "0906",
      },
      {
        id: "090613",
        name: "Santiago de Chocorvos",
        province_id: "0906",
      },
      {
        id: "090614",
        name: "Santiago de Quirahuara",
        province_id: "0906",
      },
      {
        id: "090615",
        name: "Santo Domingo de Capillas",
        province_id: "0906",
      },
      {
        id: "090616",
        name: "Tambo",
        province_id: "0906",
      },
      {
        id: "090701",
        name: "Pampas",
        province_id: "0907",
      },
      {
        id: "090702",
        name: "Acostambo",
        province_id: "0907",
      },
      {
        id: "090703",
        name: "Acraquia",
        province_id: "0907",
      },
      {
        id: "090704",
        name: "Ahuaycha",
        province_id: "0907",
      },
      {
        id: "090705",
        name: "Colcabamba",
        province_id: "0907",
      },
      {
        id: "090706",
        name: "Daniel Hernández",
        province_id: "0907",
      },
      {
        id: "090707",
        name: "Huachocolpa",
        province_id: "0907",
      },
      {
        id: "090709",
        name: "Huaribamba",
        province_id: "0907",
      },
      {
        id: "090710",
        name: "Ñahuimpuquio",
        province_id: "0907",
      },
      {
        id: "090711",
        name: "Pazos",
        province_id: "0907",
      },
      {
        id: "090713",
        name: "Quishuar",
        province_id: "0907",
      },
      {
        id: "090714",
        name: "Salcabamba",
        province_id: "0907",
      },
      {
        id: "090715",
        name: "Salcahuasi",
        province_id: "0907",
      },
      {
        id: "090716",
        name: "San Marcos de Rocchac",
        province_id: "0907",
      },
      {
        id: "090717",
        name: "Surcubamba",
        province_id: "0907",
      },
      {
        id: "090718",
        name: "Tintay Puncu",
        province_id: "0907",
      },
      {
        id: "090719",
        name: "Quichuas",
        province_id: "0907",
      },
      {
        id: "090720",
        name: "Andaymarca",
        province_id: "0907",
      },
      {
        id: "090721",
        name: "Roble",
        province_id: "0907",
      },
      {
        id: "090722",
        name: "Pichos",
        province_id: "0907",
      },
      {
        id: "090723",
        name: "Santiago de Tucuma",
        province_id: "0907",
      },
      {
        id: "100101",
        name: "Huanuco",
        province_id: "1001",
      },
      {
        id: "100102",
        name: "Amarilis",
        province_id: "1001",
      },
      {
        id: "100103",
        name: "Chinchao",
        province_id: "1001",
      },
      {
        id: "100104",
        name: "Churubamba",
        province_id: "1001",
      },
      {
        id: "100105",
        name: "Margos",
        province_id: "1001",
      },
      {
        id: "100106",
        name: "Quisqui (Kichki)",
        province_id: "1001",
      },
      {
        id: "100107",
        name: "San Francisco de Cayran",
        province_id: "1001",
      },
      {
        id: "100108",
        name: "San Pedro de Chaulan",
        province_id: "1001",
      },
      {
        id: "100109",
        name: "Santa María del Valle",
        province_id: "1001",
      },
      {
        id: "100110",
        name: "Yarumayo",
        province_id: "1001",
      },
      {
        id: "100111",
        name: "Pillco Marca",
        province_id: "1001",
      },
      {
        id: "100112",
        name: "Yacus",
        province_id: "1001",
      },
      {
        id: "100113",
        name: "San Pablo de Pillao",
        province_id: "1001",
      },
      {
        id: "100201",
        name: "Ambo",
        province_id: "1002",
      },
      {
        id: "100202",
        name: "Cayna",
        province_id: "1002",
      },
      {
        id: "100203",
        name: "Colpas",
        province_id: "1002",
      },
      {
        id: "100204",
        name: "Conchamarca",
        province_id: "1002",
      },
      {
        id: "100205",
        name: "Huacar",
        province_id: "1002",
      },
      {
        id: "100206",
        name: "San Francisco",
        province_id: "1002",
      },
      {
        id: "100207",
        name: "San Rafael",
        province_id: "1002",
      },
      {
        id: "100208",
        name: "Tomay Kichwa",
        province_id: "1002",
      },
      {
        id: "100301",
        name: "La Unión",
        province_id: "1003",
      },
      {
        id: "100307",
        name: "Chuquis",
        province_id: "1003",
      },
      {
        id: "100311",
        name: "Marías",
        province_id: "1003",
      },
      {
        id: "100313",
        name: "Pachas",
        province_id: "1003",
      },
      {
        id: "100316",
        name: "Quivilla",
        province_id: "1003",
      },
      {
        id: "100317",
        name: "Ripan",
        province_id: "1003",
      },
      {
        id: "100321",
        name: "Shunqui",
        province_id: "1003",
      },
      {
        id: "100322",
        name: "Sillapata",
        province_id: "1003",
      },
      {
        id: "100323",
        name: "Yanas",
        province_id: "1003",
      },
      {
        id: "100401",
        name: "Huacaybamba",
        province_id: "1004",
      },
      {
        id: "100402",
        name: "Canchabamba",
        province_id: "1004",
      },
      {
        id: "100403",
        name: "Cochabamba",
        province_id: "1004",
      },
      {
        id: "100404",
        name: "Pinra",
        province_id: "1004",
      },
      {
        id: "100501",
        name: "Llata",
        province_id: "1005",
      },
      {
        id: "100502",
        name: "Arancay",
        province_id: "1005",
      },
      {
        id: "100503",
        name: "Chavín de Pariarca",
        province_id: "1005",
      },
      {
        id: "100504",
        name: "Jacas Grande",
        province_id: "1005",
      },
      {
        id: "100505",
        name: "Jircan",
        province_id: "1005",
      },
      {
        id: "100506",
        name: "Miraflores",
        province_id: "1005",
      },
      {
        id: "100507",
        name: "Monzón",
        province_id: "1005",
      },
      {
        id: "100508",
        name: "Punchao",
        province_id: "1005",
      },
      {
        id: "100509",
        name: "Puños",
        province_id: "1005",
      },
      {
        id: "100510",
        name: "Singa",
        province_id: "1005",
      },
      {
        id: "100511",
        name: "Tantamayo",
        province_id: "1005",
      },
      {
        id: "100601",
        name: "Rupa-Rupa",
        province_id: "1006",
      },
      {
        id: "100602",
        name: "Daniel Alomía Robles",
        province_id: "1006",
      },
      {
        id: "100603",
        name: "Hermílio Valdizan",
        province_id: "1006",
      },
      {
        id: "100604",
        name: "José Crespo y Castillo",
        province_id: "1006",
      },
      {
        id: "100605",
        name: "Luyando",
        province_id: "1006",
      },
      {
        id: "100606",
        name: "Mariano Damaso Beraun",
        province_id: "1006",
      },
      {
        id: "100607",
        name: "Pucayacu",
        province_id: "1006",
      },
      {
        id: "100608",
        name: "Castillo Grande",
        province_id: "1006",
      },
      {
        id: "100609",
        name: "Pueblo Nuevo",
        province_id: "1006",
      },
      {
        id: "100610",
        name: "Santo Domingo de Anda",
        province_id: "1006",
      },
      {
        id: "100701",
        name: "Huacrachuco",
        province_id: "1007",
      },
      {
        id: "100702",
        name: "Cholon",
        province_id: "1007",
      },
      {
        id: "100703",
        name: "San Buenaventura",
        province_id: "1007",
      },
      {
        id: "100704",
        name: "La Morada",
        province_id: "1007",
      },
      {
        id: "100705",
        name: "Santa Rosa de Alto Yanajanca",
        province_id: "1007",
      },
      {
        id: "100801",
        name: "Panao",
        province_id: "1008",
      },
      {
        id: "100802",
        name: "Chaglla",
        province_id: "1008",
      },
      {
        id: "100803",
        name: "Molino",
        province_id: "1008",
      },
      {
        id: "100804",
        name: "Umari",
        province_id: "1008",
      },
      {
        id: "100901",
        name: "Puerto Inca",
        province_id: "1009",
      },
      {
        id: "100902",
        name: "Codo del Pozuzo",
        province_id: "1009",
      },
      {
        id: "100903",
        name: "Honoria",
        province_id: "1009",
      },
      {
        id: "100904",
        name: "Tournavista",
        province_id: "1009",
      },
      {
        id: "100905",
        name: "Yuyapichis",
        province_id: "1009",
      },
      {
        id: "101001",
        name: "Jesús",
        province_id: "1010",
      },
      {
        id: "101002",
        name: "Baños",
        province_id: "1010",
      },
      {
        id: "101003",
        name: "Jivia",
        province_id: "1010",
      },
      {
        id: "101004",
        name: "Queropalca",
        province_id: "1010",
      },
      {
        id: "101005",
        name: "Rondos",
        province_id: "1010",
      },
      {
        id: "101006",
        name: "San Francisco de Asís",
        province_id: "1010",
      },
      {
        id: "101007",
        name: "San Miguel de Cauri",
        province_id: "1010",
      },
      {
        id: "101101",
        name: "Chavinillo",
        province_id: "1011",
      },
      {
        id: "101102",
        name: "Cahuac",
        province_id: "1011",
      },
      {
        id: "101103",
        name: "Chacabamba",
        province_id: "1011",
      },
      {
        id: "101104",
        name: "Aparicio Pomares",
        province_id: "1011",
      },
      {
        id: "101105",
        name: "Jacas Chico",
        province_id: "1011",
      },
      {
        id: "101106",
        name: "Obas",
        province_id: "1011",
      },
      {
        id: "101107",
        name: "Pampamarca",
        province_id: "1011",
      },
      {
        id: "101108",
        name: "Choras",
        province_id: "1011",
      },
      {
        id: "110101",
        name: "Ica",
        province_id: "1101",
      },
      {
        id: "110102",
        name: "La Tinguiña",
        province_id: "1101",
      },
      {
        id: "110103",
        name: "Los Aquijes",
        province_id: "1101",
      },
      {
        id: "110104",
        name: "Ocucaje",
        province_id: "1101",
      },
      {
        id: "110105",
        name: "Pachacutec",
        province_id: "1101",
      },
      {
        id: "110106",
        name: "Parcona",
        province_id: "1101",
      },
      {
        id: "110107",
        name: "Pueblo Nuevo",
        province_id: "1101",
      },
      {
        id: "110108",
        name: "Salas",
        province_id: "1101",
      },
      {
        id: "110109",
        name: "San José de Los Molinos",
        province_id: "1101",
      },
      {
        id: "110110",
        name: "San Juan Bautista",
        province_id: "1101",
      },
      {
        id: "110111",
        name: "Santiago",
        province_id: "1101",
      },
      {
        id: "110112",
        name: "Subtanjalla",
        province_id: "1101",
      },
      {
        id: "110113",
        name: "Tate",
        province_id: "1101",
      },
      {
        id: "110114",
        name: "Yauca del Rosario",
        province_id: "1101",
      },
      {
        id: "110201",
        name: "Chincha Alta",
        province_id: "1102",
      },
      {
        id: "110202",
        name: "Alto Laran",
        province_id: "1102",
      },
      {
        id: "110203",
        name: "Chavin",
        province_id: "1102",
      },
      {
        id: "110204",
        name: "Chincha Baja",
        province_id: "1102",
      },
      {
        id: "110205",
        name: "El Carmen",
        province_id: "1102",
      },
      {
        id: "110206",
        name: "Grocio Prado",
        province_id: "1102",
      },
      {
        id: "110207",
        name: "Pueblo Nuevo",
        province_id: "1102",
      },
      {
        id: "110208",
        name: "San Juan de Yanac",
        province_id: "1102",
      },
      {
        id: "110209",
        name: "San Pedro de Huacarpana",
        province_id: "1102",
      },
      {
        id: "110210",
        name: "Sunampe",
        province_id: "1102",
      },
      {
        id: "110211",
        name: "Tambo de Mora",
        province_id: "1102",
      },
      {
        id: "110301",
        name: "Nasca",
        province_id: "1103",
      },
      {
        id: "110302",
        name: "Changuillo",
        province_id: "1103",
      },
      {
        id: "110303",
        name: "El Ingenio",
        province_id: "1103",
      },
      {
        id: "110304",
        name: "Marcona",
        province_id: "1103",
      },
      {
        id: "110305",
        name: "Vista Alegre",
        province_id: "1103",
      },
      {
        id: "110401",
        name: "Palpa",
        province_id: "1104",
      },
      {
        id: "110402",
        name: "Llipata",
        province_id: "1104",
      },
      {
        id: "110403",
        name: "Río Grande",
        province_id: "1104",
      },
      {
        id: "110404",
        name: "Santa Cruz",
        province_id: "1104",
      },
      {
        id: "110405",
        name: "Tibillo",
        province_id: "1104",
      },
      {
        id: "110501",
        name: "Pisco",
        province_id: "1105",
      },
      {
        id: "110502",
        name: "Huancano",
        province_id: "1105",
      },
      {
        id: "110503",
        name: "Humay",
        province_id: "1105",
      },
      {
        id: "110504",
        name: "Independencia",
        province_id: "1105",
      },
      {
        id: "110505",
        name: "Paracas",
        province_id: "1105",
      },
      {
        id: "110506",
        name: "San Andrés",
        province_id: "1105",
      },
      {
        id: "110507",
        name: "San Clemente",
        province_id: "1105",
      },
      {
        id: "110508",
        name: "Tupac Amaru Inca",
        province_id: "1105",
      },
      {
        id: "120101",
        name: "Huancayo",
        province_id: "1201",
      },
      {
        id: "120104",
        name: "Carhuacallanga",
        province_id: "1201",
      },
      {
        id: "120105",
        name: "Chacapampa",
        province_id: "1201",
      },
      {
        id: "120106",
        name: "Chicche",
        province_id: "1201",
      },
      {
        id: "120107",
        name: "Chilca",
        province_id: "1201",
      },
      {
        id: "120108",
        name: "Chongos Alto",
        province_id: "1201",
      },
      {
        id: "120111",
        name: "Chupuro",
        province_id: "1201",
      },
      {
        id: "120112",
        name: "Colca",
        province_id: "1201",
      },
      {
        id: "120113",
        name: "Cullhuas",
        province_id: "1201",
      },
      {
        id: "120114",
        name: "El Tambo",
        province_id: "1201",
      },
      {
        id: "120116",
        name: "Huacrapuquio",
        province_id: "1201",
      },
      {
        id: "120117",
        name: "Hualhuas",
        province_id: "1201",
      },
      {
        id: "120119",
        name: "Huancan",
        province_id: "1201",
      },
      {
        id: "120120",
        name: "Huasicancha",
        province_id: "1201",
      },
      {
        id: "120121",
        name: "Huayucachi",
        province_id: "1201",
      },
      {
        id: "120122",
        name: "Ingenio",
        province_id: "1201",
      },
      {
        id: "120124",
        name: "Pariahuanca",
        province_id: "1201",
      },
      {
        id: "120125",
        name: "Pilcomayo",
        province_id: "1201",
      },
      {
        id: "120126",
        name: "Pucara",
        province_id: "1201",
      },
      {
        id: "120127",
        name: "Quichuay",
        province_id: "1201",
      },
      {
        id: "120128",
        name: "Quilcas",
        province_id: "1201",
      },
      {
        id: "120129",
        name: "San Agustín",
        province_id: "1201",
      },
      {
        id: "120130",
        name: "San Jerónimo de Tunan",
        province_id: "1201",
      },
      {
        id: "120132",
        name: "Saño",
        province_id: "1201",
      },
      {
        id: "120133",
        name: "Sapallanga",
        province_id: "1201",
      },
      {
        id: "120134",
        name: "Sicaya",
        province_id: "1201",
      },
      {
        id: "120135",
        name: "Santo Domingo de Acobamba",
        province_id: "1201",
      },
      {
        id: "120136",
        name: "Viques",
        province_id: "1201",
      },
      {
        id: "120201",
        name: "Concepción",
        province_id: "1202",
      },
      {
        id: "120202",
        name: "Aco",
        province_id: "1202",
      },
      {
        id: "120203",
        name: "Andamarca",
        province_id: "1202",
      },
      {
        id: "120204",
        name: "Chambara",
        province_id: "1202",
      },
      {
        id: "120205",
        name: "Cochas",
        province_id: "1202",
      },
      {
        id: "120206",
        name: "Comas",
        province_id: "1202",
      },
      {
        id: "120207",
        name: "Heroínas Toledo",
        province_id: "1202",
      },
      {
        id: "120208",
        name: "Manzanares",
        province_id: "1202",
      },
      {
        id: "120209",
        name: "Mariscal Castilla",
        province_id: "1202",
      },
      {
        id: "120210",
        name: "Matahuasi",
        province_id: "1202",
      },
      {
        id: "120211",
        name: "Mito",
        province_id: "1202",
      },
      {
        id: "120212",
        name: "Nueve de Julio",
        province_id: "1202",
      },
      {
        id: "120213",
        name: "Orcotuna",
        province_id: "1202",
      },
      {
        id: "120214",
        name: "San José de Quero",
        province_id: "1202",
      },
      {
        id: "120215",
        name: "Santa Rosa de Ocopa",
        province_id: "1202",
      },
      {
        id: "120301",
        name: "Chanchamayo",
        province_id: "1203",
      },
      {
        id: "120302",
        name: "Perene",
        province_id: "1203",
      },
      {
        id: "120303",
        name: "Pichanaqui",
        province_id: "1203",
      },
      {
        id: "120304",
        name: "San Luis de Shuaro",
        province_id: "1203",
      },
      {
        id: "120305",
        name: "San Ramón",
        province_id: "1203",
      },
      {
        id: "120306",
        name: "Vitoc",
        province_id: "1203",
      },
      {
        id: "120401",
        name: "Jauja",
        province_id: "1204",
      },
      {
        id: "120402",
        name: "Acolla",
        province_id: "1204",
      },
      {
        id: "120403",
        name: "Apata",
        province_id: "1204",
      },
      {
        id: "120404",
        name: "Ataura",
        province_id: "1204",
      },
      {
        id: "120405",
        name: "Canchayllo",
        province_id: "1204",
      },
      {
        id: "120406",
        name: "Curicaca",
        province_id: "1204",
      },
      {
        id: "120407",
        name: "El Mantaro",
        province_id: "1204",
      },
      {
        id: "120408",
        name: "Huamali",
        province_id: "1204",
      },
      {
        id: "120409",
        name: "Huaripampa",
        province_id: "1204",
      },
      {
        id: "120410",
        name: "Huertas",
        province_id: "1204",
      },
      {
        id: "120411",
        name: "Janjaillo",
        province_id: "1204",
      },
      {
        id: "120412",
        name: "Julcán",
        province_id: "1204",
      },
      {
        id: "120413",
        name: "Leonor Ordóñez",
        province_id: "1204",
      },
      {
        id: "120414",
        name: "Llocllapampa",
        province_id: "1204",
      },
      {
        id: "120415",
        name: "Marco",
        province_id: "1204",
      },
      {
        id: "120416",
        name: "Masma",
        province_id: "1204",
      },
      {
        id: "120417",
        name: "Masma Chicche",
        province_id: "1204",
      },
      {
        id: "120418",
        name: "Molinos",
        province_id: "1204",
      },
      {
        id: "120419",
        name: "Monobamba",
        province_id: "1204",
      },
      {
        id: "120420",
        name: "Muqui",
        province_id: "1204",
      },
      {
        id: "120421",
        name: "Muquiyauyo",
        province_id: "1204",
      },
      {
        id: "120422",
        name: "Paca",
        province_id: "1204",
      },
      {
        id: "120423",
        name: "Paccha",
        province_id: "1204",
      },
      {
        id: "120424",
        name: "Pancan",
        province_id: "1204",
      },
      {
        id: "120425",
        name: "Parco",
        province_id: "1204",
      },
      {
        id: "120426",
        name: "Pomacancha",
        province_id: "1204",
      },
      {
        id: "120427",
        name: "Ricran",
        province_id: "1204",
      },
      {
        id: "120428",
        name: "San Lorenzo",
        province_id: "1204",
      },
      {
        id: "120429",
        name: "San Pedro de Chunan",
        province_id: "1204",
      },
      {
        id: "120430",
        name: "Sausa",
        province_id: "1204",
      },
      {
        id: "120431",
        name: "Sincos",
        province_id: "1204",
      },
      {
        id: "120432",
        name: "Tunan Marca",
        province_id: "1204",
      },
      {
        id: "120433",
        name: "Yauli",
        province_id: "1204",
      },
      {
        id: "120434",
        name: "Yauyos",
        province_id: "1204",
      },
      {
        id: "120501",
        name: "Junin",
        province_id: "1205",
      },
      {
        id: "120502",
        name: "Carhuamayo",
        province_id: "1205",
      },
      {
        id: "120503",
        name: "Ondores",
        province_id: "1205",
      },
      {
        id: "120504",
        name: "Ulcumayo",
        province_id: "1205",
      },
      {
        id: "120601",
        name: "Satipo",
        province_id: "1206",
      },
      {
        id: "120602",
        name: "Coviriali",
        province_id: "1206",
      },
      {
        id: "120603",
        name: "Llaylla",
        province_id: "1206",
      },
      {
        id: "120604",
        name: "Mazamari",
        province_id: "1206",
      },
      {
        id: "120605",
        name: "Pampa Hermosa",
        province_id: "1206",
      },
      {
        id: "120606",
        name: "Pangoa",
        province_id: "1206",
      },
      {
        id: "120607",
        name: "Río Negro",
        province_id: "1206",
      },
      {
        id: "120608",
        name: "Río Tambo",
        province_id: "1206",
      },
      {
        id: "120609",
        name: "Vizcatan del Ene",
        province_id: "1206",
      },
      {
        id: "120701",
        name: "Tarma",
        province_id: "1207",
      },
      {
        id: "120702",
        name: "Acobamba",
        province_id: "1207",
      },
      {
        id: "120703",
        name: "Huaricolca",
        province_id: "1207",
      },
      {
        id: "120704",
        name: "Huasahuasi",
        province_id: "1207",
      },
      {
        id: "120705",
        name: "La Unión",
        province_id: "1207",
      },
      {
        id: "120706",
        name: "Palca",
        province_id: "1207",
      },
      {
        id: "120707",
        name: "Palcamayo",
        province_id: "1207",
      },
      {
        id: "120708",
        name: "San Pedro de Cajas",
        province_id: "1207",
      },
      {
        id: "120709",
        name: "Tapo",
        province_id: "1207",
      },
      {
        id: "120801",
        name: "La Oroya",
        province_id: "1208",
      },
      {
        id: "120802",
        name: "Chacapalpa",
        province_id: "1208",
      },
      {
        id: "120803",
        name: "Huay-Huay",
        province_id: "1208",
      },
      {
        id: "120804",
        name: "Marcapomacocha",
        province_id: "1208",
      },
      {
        id: "120805",
        name: "Morococha",
        province_id: "1208",
      },
      {
        id: "120806",
        name: "Paccha",
        province_id: "1208",
      },
      {
        id: "120807",
        name: "Santa Bárbara de Carhuacayan",
        province_id: "1208",
      },
      {
        id: "120808",
        name: "Santa Rosa de Sacco",
        province_id: "1208",
      },
      {
        id: "120809",
        name: "Suitucancha",
        province_id: "1208",
      },
      {
        id: "120810",
        name: "Yauli",
        province_id: "1208",
      },
      {
        id: "120901",
        name: "Chupaca",
        province_id: "1209",
      },
      {
        id: "120902",
        name: "Ahuac",
        province_id: "1209",
      },
      {
        id: "120903",
        name: "Chongos Bajo",
        province_id: "1209",
      },
      {
        id: "120904",
        name: "Huachac",
        province_id: "1209",
      },
      {
        id: "120905",
        name: "Huamancaca Chico",
        province_id: "1209",
      },
      {
        id: "120906",
        name: "San Juan de Iscos",
        province_id: "1209",
      },
      {
        id: "120907",
        name: "San Juan de Jarpa",
        province_id: "1209",
      },
      {
        id: "120908",
        name: "Tres de Diciembre",
        province_id: "1209",
      },
      {
        id: "120909",
        name: "Yanacancha",
        province_id: "1209",
      },
      {
        id: "130101",
        name: "Trujillo",
        province_id: "1301",
      },
      {
        id: "130102",
        name: "El Porvenir",
        province_id: "1301",
      },
      {
        id: "130103",
        name: "Florencia de Mora",
        province_id: "1301",
      },
      {
        id: "130104",
        name: "Huanchaco",
        province_id: "1301",
      },
      {
        id: "130105",
        name: "La Esperanza",
        province_id: "1301",
      },
      {
        id: "130106",
        name: "Laredo",
        province_id: "1301",
      },
      {
        id: "130107",
        name: "Moche",
        province_id: "1301",
      },
      {
        id: "130108",
        name: "Poroto",
        province_id: "1301",
      },
      {
        id: "130109",
        name: "Salaverry",
        province_id: "1301",
      },
      {
        id: "130110",
        name: "Simbal",
        province_id: "1301",
      },
      {
        id: "130111",
        name: "Victor Larco Herrera",
        province_id: "1301",
      },
      {
        id: "130201",
        name: "Ascope",
        province_id: "1302",
      },
      {
        id: "130202",
        name: "Chicama",
        province_id: "1302",
      },
      {
        id: "130203",
        name: "Chocope",
        province_id: "1302",
      },
      {
        id: "130204",
        name: "Magdalena de Cao",
        province_id: "1302",
      },
      {
        id: "130205",
        name: "Paijan",
        province_id: "1302",
      },
      {
        id: "130206",
        name: "Rázuri",
        province_id: "1302",
      },
      {
        id: "130207",
        name: "Santiago de Cao",
        province_id: "1302",
      },
      {
        id: "130208",
        name: "Casa Grande",
        province_id: "1302",
      },
      {
        id: "130301",
        name: "Bolívar",
        province_id: "1303",
      },
      {
        id: "130302",
        name: "Bambamarca",
        province_id: "1303",
      },
      {
        id: "130303",
        name: "Condormarca",
        province_id: "1303",
      },
      {
        id: "130304",
        name: "Longotea",
        province_id: "1303",
      },
      {
        id: "130305",
        name: "Uchumarca",
        province_id: "1303",
      },
      {
        id: "130306",
        name: "Ucuncha",
        province_id: "1303",
      },
      {
        id: "130401",
        name: "Chepen",
        province_id: "1304",
      },
      {
        id: "130402",
        name: "Pacanga",
        province_id: "1304",
      },
      {
        id: "130403",
        name: "Pueblo Nuevo",
        province_id: "1304",
      },
      {
        id: "130501",
        name: "Julcan",
        province_id: "1305",
      },
      {
        id: "130502",
        name: "Calamarca",
        province_id: "1305",
      },
      {
        id: "130503",
        name: "Carabamba",
        province_id: "1305",
      },
      {
        id: "130504",
        name: "Huaso",
        province_id: "1305",
      },
      {
        id: "130601",
        name: "Otuzco",
        province_id: "1306",
      },
      {
        id: "130602",
        name: "Agallpampa",
        province_id: "1306",
      },
      {
        id: "130604",
        name: "Charat",
        province_id: "1306",
      },
      {
        id: "130605",
        name: "Huaranchal",
        province_id: "1306",
      },
      {
        id: "130606",
        name: "La Cuesta",
        province_id: "1306",
      },
      {
        id: "130608",
        name: "Mache",
        province_id: "1306",
      },
      {
        id: "130610",
        name: "Paranday",
        province_id: "1306",
      },
      {
        id: "130611",
        name: "Salpo",
        province_id: "1306",
      },
      {
        id: "130613",
        name: "Sinsicap",
        province_id: "1306",
      },
      {
        id: "130614",
        name: "Usquil",
        province_id: "1306",
      },
      {
        id: "130701",
        name: "San Pedro de Lloc",
        province_id: "1307",
      },
      {
        id: "130702",
        name: "Guadalupe",
        province_id: "1307",
      },
      {
        id: "130703",
        name: "Jequetepeque",
        province_id: "1307",
      },
      {
        id: "130704",
        name: "Pacasmayo",
        province_id: "1307",
      },
      {
        id: "130705",
        name: "San José",
        province_id: "1307",
      },
      {
        id: "130801",
        name: "Tayabamba",
        province_id: "1308",
      },
      {
        id: "130802",
        name: "Buldibuyo",
        province_id: "1308",
      },
      {
        id: "130803",
        name: "Chillia",
        province_id: "1308",
      },
      {
        id: "130804",
        name: "Huancaspata",
        province_id: "1308",
      },
      {
        id: "130805",
        name: "Huaylillas",
        province_id: "1308",
      },
      {
        id: "130806",
        name: "Huayo",
        province_id: "1308",
      },
      {
        id: "130807",
        name: "Ongon",
        province_id: "1308",
      },
      {
        id: "130808",
        name: "Parcoy",
        province_id: "1308",
      },
      {
        id: "130809",
        name: "Pataz",
        province_id: "1308",
      },
      {
        id: "130810",
        name: "Pias",
        province_id: "1308",
      },
      {
        id: "130811",
        name: "Santiago de Challas",
        province_id: "1308",
      },
      {
        id: "130812",
        name: "Taurija",
        province_id: "1308",
      },
      {
        id: "130813",
        name: "Urpay",
        province_id: "1308",
      },
      {
        id: "130901",
        name: "Huamachuco",
        province_id: "1309",
      },
      {
        id: "130902",
        name: "Chugay",
        province_id: "1309",
      },
      {
        id: "130903",
        name: "Cochorco",
        province_id: "1309",
      },
      {
        id: "130904",
        name: "Curgos",
        province_id: "1309",
      },
      {
        id: "130905",
        name: "Marcabal",
        province_id: "1309",
      },
      {
        id: "130906",
        name: "Sanagoran",
        province_id: "1309",
      },
      {
        id: "130907",
        name: "Sarin",
        province_id: "1309",
      },
      {
        id: "130908",
        name: "Sartimbamba",
        province_id: "1309",
      },
      {
        id: "131001",
        name: "Santiago de Chuco",
        province_id: "1310",
      },
      {
        id: "131002",
        name: "Angasmarca",
        province_id: "1310",
      },
      {
        id: "131003",
        name: "Cachicadan",
        province_id: "1310",
      },
      {
        id: "131004",
        name: "Mollebamba",
        province_id: "1310",
      },
      {
        id: "131005",
        name: "Mollepata",
        province_id: "1310",
      },
      {
        id: "131006",
        name: "Quiruvilca",
        province_id: "1310",
      },
      {
        id: "131007",
        name: "Santa Cruz de Chuca",
        province_id: "1310",
      },
      {
        id: "131008",
        name: "Sitabamba",
        province_id: "1310",
      },
      {
        id: "131101",
        name: "Cascas",
        province_id: "1311",
      },
      {
        id: "131102",
        name: "Lucma",
        province_id: "1311",
      },
      {
        id: "131103",
        name: "Marmot",
        province_id: "1311",
      },
      {
        id: "131104",
        name: "Sayapullo",
        province_id: "1311",
      },
      {
        id: "131201",
        name: "Viru",
        province_id: "1312",
      },
      {
        id: "131202",
        name: "Chao",
        province_id: "1312",
      },
      {
        id: "131203",
        name: "Guadalupito",
        province_id: "1312",
      },
      {
        id: "140101",
        name: "Chiclayo",
        province_id: "1401",
      },
      {
        id: "140102",
        name: "Chongoyape",
        province_id: "1401",
      },
      {
        id: "140103",
        name: "Eten",
        province_id: "1401",
      },
      {
        id: "140104",
        name: "Eten Puerto",
        province_id: "1401",
      },
      {
        id: "140105",
        name: "José Leonardo Ortiz",
        province_id: "1401",
      },
      {
        id: "140106",
        name: "La Victoria",
        province_id: "1401",
      },
      {
        id: "140107",
        name: "Lagunas",
        province_id: "1401",
      },
      {
        id: "140108",
        name: "Monsefu",
        province_id: "1401",
      },
      {
        id: "140109",
        name: "Nueva Arica",
        province_id: "1401",
      },
      {
        id: "140110",
        name: "Oyotun",
        province_id: "1401",
      },
      {
        id: "140111",
        name: "Picsi",
        province_id: "1401",
      },
      {
        id: "140112",
        name: "Pimentel",
        province_id: "1401",
      },
      {
        id: "140113",
        name: "Reque",
        province_id: "1401",
      },
      {
        id: "140114",
        name: "Santa Rosa",
        province_id: "1401",
      },
      {
        id: "140115",
        name: "Saña",
        province_id: "1401",
      },
      {
        id: "140116",
        name: "Cayalti",
        province_id: "1401",
      },
      {
        id: "140117",
        name: "Patapo",
        province_id: "1401",
      },
      {
        id: "140118",
        name: "Pomalca",
        province_id: "1401",
      },
      {
        id: "140119",
        name: "Pucala",
        province_id: "1401",
      },
      {
        id: "140120",
        name: "Tuman",
        province_id: "1401",
      },
      {
        id: "140201",
        name: "Ferreñafe",
        province_id: "1402",
      },
      {
        id: "140202",
        name: "Cañaris",
        province_id: "1402",
      },
      {
        id: "140203",
        name: "Incahuasi",
        province_id: "1402",
      },
      {
        id: "140204",
        name: "Manuel Antonio Mesones Muro",
        province_id: "1402",
      },
      {
        id: "140205",
        name: "Pitipo",
        province_id: "1402",
      },
      {
        id: "140206",
        name: "Pueblo Nuevo",
        province_id: "1402",
      },
      {
        id: "140301",
        name: "Lambayeque",
        province_id: "1403",
      },
      {
        id: "140302",
        name: "Chochope",
        province_id: "1403",
      },
      {
        id: "140303",
        name: "Illimo",
        province_id: "1403",
      },
      {
        id: "140304",
        name: "Jayanca",
        province_id: "1403",
      },
      {
        id: "140305",
        name: "Mochumi",
        province_id: "1403",
      },
      {
        id: "140306",
        name: "Morrope",
        province_id: "1403",
      },
      {
        id: "140307",
        name: "Motupe",
        province_id: "1403",
      },
      {
        id: "140308",
        name: "Olmos",
        province_id: "1403",
      },
      {
        id: "140309",
        name: "Pacora",
        province_id: "1403",
      },
      {
        id: "140310",
        name: "Salas",
        province_id: "1403",
      },
      {
        id: "140311",
        name: "San José",
        province_id: "1403",
      },
      {
        id: "140312",
        name: "Tucume",
        province_id: "1403",
      },
      {
        id: "150101",
        name: "Lima",
        province_id: "1501",
      },
      {
        id: "150102",
        name: "Ancón",
        province_id: "1501",
      },
      {
        id: "150103",
        name: "Ate",
        province_id: "1501",
      },
      {
        id: "150104",
        name: "Barranco",
        province_id: "1501",
      },
      {
        id: "150105",
        name: "Breña",
        province_id: "1501",
      },
      {
        id: "150106",
        name: "Carabayllo",
        province_id: "1501",
      },
      {
        id: "150107",
        name: "Chaclacayo",
        province_id: "1501",
      },
      {
        id: "150108",
        name: "Chorrillos",
        province_id: "1501",
      },
      {
        id: "150109",
        name: "Cieneguilla",
        province_id: "1501",
      },
      {
        id: "150110",
        name: "Comas",
        province_id: "1501",
      },
      {
        id: "150111",
        name: "El Agustino",
        province_id: "1501",
      },
      {
        id: "150112",
        name: "Independencia",
        province_id: "1501",
      },
      {
        id: "150113",
        name: "Jesús María",
        province_id: "1501",
      },
      {
        id: "150114",
        name: "La Molina",
        province_id: "1501",
      },
      {
        id: "150115",
        name: "La Victoria",
        province_id: "1501",
      },
      {
        id: "150116",
        name: "Lince",
        province_id: "1501",
      },
      {
        id: "150117",
        name: "Los Olivos",
        province_id: "1501",
      },
      {
        id: "150118",
        name: "Lurigancho",
        province_id: "1501",
      },
      {
        id: "150119",
        name: "Lurin",
        province_id: "1501",
      },
      {
        id: "150120",
        name: "Magdalena del Mar",
        province_id: "1501",
      },
      {
        id: "150121",
        name: "Pueblo Libre",
        province_id: "1501",
      },
      {
        id: "150122",
        name: "Miraflores",
        province_id: "1501",
      },
      {
        id: "150123",
        name: "Pachacamac",
        province_id: "1501",
      },
      {
        id: "150124",
        name: "Pucusana",
        province_id: "1501",
      },
      {
        id: "150125",
        name: "Puente Piedra",
        province_id: "1501",
      },
      {
        id: "150126",
        name: "Punta Hermosa",
        province_id: "1501",
      },
      {
        id: "150127",
        name: "Punta Negra",
        province_id: "1501",
      },
      {
        id: "150128",
        name: "Rímac",
        province_id: "1501",
      },
      {
        id: "150129",
        name: "San Bartolo",
        province_id: "1501",
      },
      {
        id: "150130",
        name: "San Borja",
        province_id: "1501",
      },
      {
        id: "150131",
        name: "San Isidro",
        province_id: "1501",
      },
      {
        id: "150132",
        name: "San Juan de Lurigancho",
        province_id: "1501",
      },
      {
        id: "150133",
        name: "San Juan de Miraflores",
        province_id: "1501",
      },
      {
        id: "150134",
        name: "San Luis",
        province_id: "1501",
      },
      {
        id: "150135",
        name: "San Martín de Porres",
        province_id: "1501",
      },
      {
        id: "150136",
        name: "San Miguel",
        province_id: "1501",
      },
      {
        id: "150137",
        name: "Santa Anita",
        province_id: "1501",
      },
      {
        id: "150138",
        name: "Santa María del Mar",
        province_id: "1501",
      },
      {
        id: "150139",
        name: "Santa Rosa",
        province_id: "1501",
      },
      {
        id: "150140",
        name: "Santiago de Surco",
        province_id: "1501",
      },
      {
        id: "150141",
        name: "Surquillo",
        province_id: "1501",
      },
      {
        id: "150142",
        name: "Villa El Salvador",
        province_id: "1501",
      },
      {
        id: "150143",
        name: "Villa María del Triunfo",
        province_id: "1501",
      },
      {
        id: "150201",
        name: "Barranca",
        province_id: "1502",
      },
      {
        id: "150202",
        name: "Paramonga",
        province_id: "1502",
      },
      {
        id: "150203",
        name: "Pativilca",
        province_id: "1502",
      },
      {
        id: "150204",
        name: "Supe",
        province_id: "1502",
      },
      {
        id: "150205",
        name: "Supe Puerto",
        province_id: "1502",
      },
      {
        id: "150301",
        name: "Cajatambo",
        province_id: "1503",
      },
      {
        id: "150302",
        name: "Copa",
        province_id: "1503",
      },
      {
        id: "150303",
        name: "Gorgor",
        province_id: "1503",
      },
      {
        id: "150304",
        name: "Huancapon",
        province_id: "1503",
      },
      {
        id: "150305",
        name: "Manas",
        province_id: "1503",
      },
      {
        id: "150401",
        name: "Canta",
        province_id: "1504",
      },
      {
        id: "150402",
        name: "Arahuay",
        province_id: "1504",
      },
      {
        id: "150403",
        name: "Huamantanga",
        province_id: "1504",
      },
      {
        id: "150404",
        name: "Huaros",
        province_id: "1504",
      },
      {
        id: "150405",
        name: "Lachaqui",
        province_id: "1504",
      },
      {
        id: "150406",
        name: "San Buenaventura",
        province_id: "1504",
      },
      {
        id: "150407",
        name: "Santa Rosa de Quives",
        province_id: "1504",
      },
      {
        id: "150501",
        name: "San Vicente de Cañete",
        province_id: "1505",
      },
      {
        id: "150502",
        name: "Asia",
        province_id: "1505",
      },
      {
        id: "150503",
        name: "Calango",
        province_id: "1505",
      },
      {
        id: "150504",
        name: "Cerro Azul",
        province_id: "1505",
      },
      {
        id: "150505",
        name: "Chilca",
        province_id: "1505",
      },
      {
        id: "150506",
        name: "Coayllo",
        province_id: "1505",
      },
      {
        id: "150507",
        name: "Imperial",
        province_id: "1505",
      },
      {
        id: "150508",
        name: "Lunahuana",
        province_id: "1505",
      },
      {
        id: "150509",
        name: "Mala",
        province_id: "1505",
      },
      {
        id: "150510",
        name: "Nuevo Imperial",
        province_id: "1505",
      },
      {
        id: "150511",
        name: "Pacaran",
        province_id: "1505",
      },
      {
        id: "150512",
        name: "Quilmana",
        province_id: "1505",
      },
      {
        id: "150513",
        name: "San Antonio",
        province_id: "1505",
      },
      {
        id: "150514",
        name: "San Luis",
        province_id: "1505",
      },
      {
        id: "150515",
        name: "Santa Cruz de Flores",
        province_id: "1505",
      },
      {
        id: "150516",
        name: "Zúñiga",
        province_id: "1505",
      },
      {
        id: "150601",
        name: "Huaral",
        province_id: "1506",
      },
      {
        id: "150602",
        name: "Atavillos Alto",
        province_id: "1506",
      },
      {
        id: "150603",
        name: "Atavillos Bajo",
        province_id: "1506",
      },
      {
        id: "150604",
        name: "Aucallama",
        province_id: "1506",
      },
      {
        id: "150605",
        name: "Chancay",
        province_id: "1506",
      },
      {
        id: "150606",
        name: "Ihuari",
        province_id: "1506",
      },
      {
        id: "150607",
        name: "Lampian",
        province_id: "1506",
      },
      {
        id: "150608",
        name: "Pacaraos",
        province_id: "1506",
      },
      {
        id: "150609",
        name: "San Miguel de Acos",
        province_id: "1506",
      },
      {
        id: "150610",
        name: "Santa Cruz de Andamarca",
        province_id: "1506",
      },
      {
        id: "150611",
        name: "Sumbilca",
        province_id: "1506",
      },
      {
        id: "150612",
        name: "Veintisiete de Noviembre",
        province_id: "1506",
      },
      {
        id: "150701",
        name: "Matucana",
        province_id: "1507",
      },
      {
        id: "150702",
        name: "Antioquia",
        province_id: "1507",
      },
      {
        id: "150703",
        name: "Callahuanca",
        province_id: "1507",
      },
      {
        id: "150704",
        name: "Carampoma",
        province_id: "1507",
      },
      {
        id: "150705",
        name: "Chicla",
        province_id: "1507",
      },
      {
        id: "150706",
        name: "Cuenca",
        province_id: "1507",
      },
      {
        id: "150707",
        name: "Huachupampa",
        province_id: "1507",
      },
      {
        id: "150708",
        name: "Huanza",
        province_id: "1507",
      },
      {
        id: "150709",
        name: "Huarochiri",
        province_id: "1507",
      },
      {
        id: "150710",
        name: "Lahuaytambo",
        province_id: "1507",
      },
      {
        id: "150711",
        name: "Langa",
        province_id: "1507",
      },
      {
        id: "150712",
        name: "Laraos",
        province_id: "1507",
      },
      {
        id: "150713",
        name: "Mariatana",
        province_id: "1507",
      },
      {
        id: "150714",
        name: "Ricardo Palma",
        province_id: "1507",
      },
      {
        id: "150715",
        name: "San Andrés de Tupicocha",
        province_id: "1507",
      },
      {
        id: "150716",
        name: "San Antonio",
        province_id: "1507",
      },
      {
        id: "150717",
        name: "San Bartolomé",
        province_id: "1507",
      },
      {
        id: "150718",
        name: "San Damian",
        province_id: "1507",
      },
      {
        id: "150719",
        name: "San Juan de Iris",
        province_id: "1507",
      },
      {
        id: "150720",
        name: "San Juan de Tantaranche",
        province_id: "1507",
      },
      {
        id: "150721",
        name: "San Lorenzo de Quinti",
        province_id: "1507",
      },
      {
        id: "150722",
        name: "San Mateo",
        province_id: "1507",
      },
      {
        id: "150723",
        name: "San Mateo de Otao",
        province_id: "1507",
      },
      {
        id: "150724",
        name: "San Pedro de Casta",
        province_id: "1507",
      },
      {
        id: "150725",
        name: "San Pedro de Huancayre",
        province_id: "1507",
      },
      {
        id: "150726",
        name: "Sangallaya",
        province_id: "1507",
      },
      {
        id: "150727",
        name: "Santa Cruz de Cocachacra",
        province_id: "1507",
      },
      {
        id: "150728",
        name: "Santa Eulalia",
        province_id: "1507",
      },
      {
        id: "150729",
        name: "Santiago de Anchucaya",
        province_id: "1507",
      },
      {
        id: "150730",
        name: "Santiago de Tuna",
        province_id: "1507",
      },
      {
        id: "150731",
        name: "Santo Domingo de Los Olleros",
        province_id: "1507",
      },
      {
        id: "150732",
        name: "Surco",
        province_id: "1507",
      },
      {
        id: "150801",
        name: "Huacho",
        province_id: "1508",
      },
      {
        id: "150802",
        name: "Ambar",
        province_id: "1508",
      },
      {
        id: "150803",
        name: "Caleta de Carquin",
        province_id: "1508",
      },
      {
        id: "150804",
        name: "Checras",
        province_id: "1508",
      },
      {
        id: "150805",
        name: "Hualmay",
        province_id: "1508",
      },
      {
        id: "150806",
        name: "Huaura",
        province_id: "1508",
      },
      {
        id: "150807",
        name: "Leoncio Prado",
        province_id: "1508",
      },
      {
        id: "150808",
        name: "Paccho",
        province_id: "1508",
      },
      {
        id: "150809",
        name: "Santa Leonor",
        province_id: "1508",
      },
      {
        id: "150810",
        name: "Santa María",
        province_id: "1508",
      },
      {
        id: "150811",
        name: "Sayan",
        province_id: "1508",
      },
      {
        id: "150812",
        name: "Vegueta",
        province_id: "1508",
      },
      {
        id: "150901",
        name: "Oyon",
        province_id: "1509",
      },
      {
        id: "150902",
        name: "Andajes",
        province_id: "1509",
      },
      {
        id: "150903",
        name: "Caujul",
        province_id: "1509",
      },
      {
        id: "150904",
        name: "Cochamarca",
        province_id: "1509",
      },
      {
        id: "150905",
        name: "Navan",
        province_id: "1509",
      },
      {
        id: "150906",
        name: "Pachangara",
        province_id: "1509",
      },
      {
        id: "151001",
        name: "Yauyos",
        province_id: "1510",
      },
      {
        id: "151002",
        name: "Alis",
        province_id: "1510",
      },
      {
        id: "151003",
        name: "Allauca",
        province_id: "1510",
      },
      {
        id: "151004",
        name: "Ayaviri",
        province_id: "1510",
      },
      {
        id: "151005",
        name: "Azángaro",
        province_id: "1510",
      },
      {
        id: "151006",
        name: "Cacra",
        province_id: "1510",
      },
      {
        id: "151007",
        name: "Carania",
        province_id: "1510",
      },
      {
        id: "151008",
        name: "Catahuasi",
        province_id: "1510",
      },
      {
        id: "151009",
        name: "Chocos",
        province_id: "1510",
      },
      {
        id: "151010",
        name: "Cochas",
        province_id: "1510",
      },
      {
        id: "151011",
        name: "Colonia",
        province_id: "1510",
      },
      {
        id: "151012",
        name: "Hongos",
        province_id: "1510",
      },
      {
        id: "151013",
        name: "Huampara",
        province_id: "1510",
      },
      {
        id: "151014",
        name: "Huancaya",
        province_id: "1510",
      },
      {
        id: "151015",
        name: "Huangascar",
        province_id: "1510",
      },
      {
        id: "151016",
        name: "Huantan",
        province_id: "1510",
      },
      {
        id: "151017",
        name: "Huañec",
        province_id: "1510",
      },
      {
        id: "151018",
        name: "Laraos",
        province_id: "1510",
      },
      {
        id: "151019",
        name: "Lincha",
        province_id: "1510",
      },
      {
        id: "151020",
        name: "Madean",
        province_id: "1510",
      },
      {
        id: "151021",
        name: "Miraflores",
        province_id: "1510",
      },
      {
        id: "151022",
        name: "Omas",
        province_id: "1510",
      },
      {
        id: "151023",
        name: "Putinza",
        province_id: "1510",
      },
      {
        id: "151024",
        name: "Quinches",
        province_id: "1510",
      },
      {
        id: "151025",
        name: "Quinocay",
        province_id: "1510",
      },
      {
        id: "151026",
        name: "San Joaquín",
        province_id: "1510",
      },
      {
        id: "151027",
        name: "San Pedro de Pilas",
        province_id: "1510",
      },
      {
        id: "151028",
        name: "Tanta",
        province_id: "1510",
      },
      {
        id: "151029",
        name: "Tauripampa",
        province_id: "1510",
      },
      {
        id: "151030",
        name: "Tomas",
        province_id: "1510",
      },
      {
        id: "151031",
        name: "Tupe",
        province_id: "1510",
      },
      {
        id: "151032",
        name: "Viñac",
        province_id: "1510",
      },
      {
        id: "151033",
        name: "Vitis",
        province_id: "1510",
      },
      {
        id: "160101",
        name: "Iquitos",
        province_id: "1601",
      },
      {
        id: "160102",
        name: "Alto Nanay",
        province_id: "1601",
      },
      {
        id: "160103",
        name: "Fernando Lores",
        province_id: "1601",
      },
      {
        id: "160104",
        name: "Indiana",
        province_id: "1601",
      },
      {
        id: "160105",
        name: "Las Amazonas",
        province_id: "1601",
      },
      {
        id: "160106",
        name: "Mazan",
        province_id: "1601",
      },
      {
        id: "160107",
        name: "Napo",
        province_id: "1601",
      },
      {
        id: "160108",
        name: "Punchana",
        province_id: "1601",
      },
      {
        id: "160110",
        name: "Torres Causana",
        province_id: "1601",
      },
      {
        id: "160112",
        name: "Belén",
        province_id: "1601",
      },
      {
        id: "160113",
        name: "San Juan Bautista",
        province_id: "1601",
      },
      {
        id: "160201",
        name: "Yurimaguas",
        province_id: "1602",
      },
      {
        id: "160202",
        name: "Balsapuerto",
        province_id: "1602",
      },
      {
        id: "160205",
        name: "Jeberos",
        province_id: "1602",
      },
      {
        id: "160206",
        name: "Lagunas",
        province_id: "1602",
      },
      {
        id: "160210",
        name: "Santa Cruz",
        province_id: "1602",
      },
      {
        id: "160211",
        name: "Teniente Cesar López Rojas",
        province_id: "1602",
      },
      {
        id: "160301",
        name: "Nauta",
        province_id: "1603",
      },
      {
        id: "160302",
        name: "Parinari",
        province_id: "1603",
      },
      {
        id: "160303",
        name: "Tigre",
        province_id: "1603",
      },
      {
        id: "160304",
        name: "Trompeteros",
        province_id: "1603",
      },
      {
        id: "160305",
        name: "Urarinas",
        province_id: "1603",
      },
      {
        id: "160401",
        name: "Ramón Castilla",
        province_id: "1604",
      },
      {
        id: "160402",
        name: "Pebas",
        province_id: "1604",
      },
      {
        id: "160403",
        name: "Yavari",
        province_id: "1604",
      },
      {
        id: "160404",
        name: "San Pablo",
        province_id: "1604",
      },
      {
        id: "160501",
        name: "Requena",
        province_id: "1605",
      },
      {
        id: "160502",
        name: "Alto Tapiche",
        province_id: "1605",
      },
      {
        id: "160503",
        name: "Capelo",
        province_id: "1605",
      },
      {
        id: "160504",
        name: "Emilio San Martín",
        province_id: "1605",
      },
      {
        id: "160505",
        name: "Maquia",
        province_id: "1605",
      },
      {
        id: "160506",
        name: "Puinahua",
        province_id: "1605",
      },
      {
        id: "160507",
        name: "Saquena",
        province_id: "1605",
      },
      {
        id: "160508",
        name: "Soplin",
        province_id: "1605",
      },
      {
        id: "160509",
        name: "Tapiche",
        province_id: "1605",
      },
      {
        id: "160510",
        name: "Jenaro Herrera",
        province_id: "1605",
      },
      {
        id: "160511",
        name: "Yaquerana",
        province_id: "1605",
      },
      {
        id: "160601",
        name: "Contamana",
        province_id: "1606",
      },
      {
        id: "160602",
        name: "Inahuaya",
        province_id: "1606",
      },
      {
        id: "160603",
        name: "Padre Márquez",
        province_id: "1606",
      },
      {
        id: "160604",
        name: "Pampa Hermosa",
        province_id: "1606",
      },
      {
        id: "160605",
        name: "Sarayacu",
        province_id: "1606",
      },
      {
        id: "160606",
        name: "Vargas Guerra",
        province_id: "1606",
      },
      {
        id: "160701",
        name: "Barranca",
        province_id: "1607",
      },
      {
        id: "160702",
        name: "Cahuapanas",
        province_id: "1607",
      },
      {
        id: "160703",
        name: "Manseriche",
        province_id: "1607",
      },
      {
        id: "160704",
        name: "Morona",
        province_id: "1607",
      },
      {
        id: "160705",
        name: "Pastaza",
        province_id: "1607",
      },
      {
        id: "160706",
        name: "Andoas",
        province_id: "1607",
      },
      {
        id: "160801",
        name: "Putumayo",
        province_id: "1608",
      },
      {
        id: "160802",
        name: "Rosa Panduro",
        province_id: "1608",
      },
      {
        id: "160803",
        name: "Teniente Manuel Clavero",
        province_id: "1608",
      },
      {
        id: "160804",
        name: "Yaguas",
        province_id: "1608",
      },
      {
        id: "170101",
        name: "Tambopata",
        province_id: "1701",
      },
      {
        id: "170102",
        name: "Inambari",
        province_id: "1701",
      },
      {
        id: "170103",
        name: "Las Piedras",
        province_id: "1701",
      },
      {
        id: "170104",
        name: "Laberinto",
        province_id: "1701",
      },
      {
        id: "170201",
        name: "Manu",
        province_id: "1702",
      },
      {
        id: "170202",
        name: "Fitzcarrald",
        province_id: "1702",
      },
      {
        id: "170203",
        name: "Madre de Dios",
        province_id: "1702",
      },
      {
        id: "170204",
        name: "Huepetuhe",
        province_id: "1702",
      },
      {
        id: "170301",
        name: "Iñapari",
        province_id: "1703",
      },
      {
        id: "170302",
        name: "Iberia",
        province_id: "1703",
      },
      {
        id: "170303",
        name: "Tahuamanu",
        province_id: "1703",
      },
      {
        id: "180101",
        name: "Moquegua",
        province_id: "1801",
      },
      {
        id: "180102",
        name: "Carumas",
        province_id: "1801",
      },
      {
        id: "180103",
        name: "Cuchumbaya",
        province_id: "1801",
      },
      {
        id: "180104",
        name: "Samegua",
        province_id: "1801",
      },
      {
        id: "180105",
        name: "San Cristóbal",
        province_id: "1801",
      },
      {
        id: "180106",
        name: "Torata",
        province_id: "1801",
      },
      {
        id: "180201",
        name: "Omate",
        province_id: "1802",
      },
      {
        id: "180202",
        name: "Chojata",
        province_id: "1802",
      },
      {
        id: "180203",
        name: "Coalaque",
        province_id: "1802",
      },
      {
        id: "180204",
        name: "Ichuña",
        province_id: "1802",
      },
      {
        id: "180205",
        name: "La Capilla",
        province_id: "1802",
      },
      {
        id: "180206",
        name: "Lloque",
        province_id: "1802",
      },
      {
        id: "180207",
        name: "Matalaque",
        province_id: "1802",
      },
      {
        id: "180208",
        name: "Puquina",
        province_id: "1802",
      },
      {
        id: "180209",
        name: "Quinistaquillas",
        province_id: "1802",
      },
      {
        id: "180210",
        name: "Ubinas",
        province_id: "1802",
      },
      {
        id: "180211",
        name: "Yunga",
        province_id: "1802",
      },
      {
        id: "180301",
        name: "Ilo",
        province_id: "1803",
      },
      {
        id: "180302",
        name: "El Algarrobal",
        province_id: "1803",
      },
      {
        id: "180303",
        name: "Pacocha",
        province_id: "1803",
      },
      {
        id: "190101",
        name: "Chaupimarca",
        province_id: "1901",
      },
      {
        id: "190102",
        name: "Huachon",
        province_id: "1901",
      },
      {
        id: "190103",
        name: "Huariaca",
        province_id: "1901",
      },
      {
        id: "190104",
        name: "Huayllay",
        province_id: "1901",
      },
      {
        id: "190105",
        name: "Ninacaca",
        province_id: "1901",
      },
      {
        id: "190106",
        name: "Pallanchacra",
        province_id: "1901",
      },
      {
        id: "190107",
        name: "Paucartambo",
        province_id: "1901",
      },
      {
        id: "190108",
        name: "San Francisco de Asís de Yarusyacan",
        province_id: "1901",
      },
      {
        id: "190109",
        name: "Simon Bolívar",
        province_id: "1901",
      },
      {
        id: "190110",
        name: "Ticlacayan",
        province_id: "1901",
      },
      {
        id: "190111",
        name: "Tinyahuarco",
        province_id: "1901",
      },
      {
        id: "190112",
        name: "Vicco",
        province_id: "1901",
      },
      {
        id: "190113",
        name: "Yanacancha",
        province_id: "1901",
      },
      {
        id: "190201",
        name: "Yanahuanca",
        province_id: "1902",
      },
      {
        id: "190202",
        name: "Chacayan",
        province_id: "1902",
      },
      {
        id: "190203",
        name: "Goyllarisquizga",
        province_id: "1902",
      },
      {
        id: "190204",
        name: "Paucar",
        province_id: "1902",
      },
      {
        id: "190205",
        name: "San Pedro de Pillao",
        province_id: "1902",
      },
      {
        id: "190206",
        name: "Santa Ana de Tusi",
        province_id: "1902",
      },
      {
        id: "190207",
        name: "Tapuc",
        province_id: "1902",
      },
      {
        id: "190208",
        name: "Vilcabamba",
        province_id: "1902",
      },
      {
        id: "190301",
        name: "Oxapampa",
        province_id: "1903",
      },
      {
        id: "190302",
        name: "Chontabamba",
        province_id: "1903",
      },
      {
        id: "190303",
        name: "Huancabamba",
        province_id: "1903",
      },
      {
        id: "190304",
        name: "Palcazu",
        province_id: "1903",
      },
      {
        id: "190305",
        name: "Pozuzo",
        province_id: "1903",
      },
      {
        id: "190306",
        name: "Puerto Bermúdez",
        province_id: "1903",
      },
      {
        id: "190307",
        name: "Villa Rica",
        province_id: "1903",
      },
      {
        id: "190308",
        name: "Constitución",
        province_id: "1903",
      },
      {
        id: "200101",
        name: "Piura",
        province_id: "2001",
      },
      {
        id: "200104",
        name: "Castilla",
        province_id: "2001",
      },
      {
        id: "200105",
        name: "Catacaos",
        province_id: "2001",
      },
      {
        id: "200107",
        name: "Cura Mori",
        province_id: "2001",
      },
      {
        id: "200108",
        name: "El Tallan",
        province_id: "2001",
      },
      {
        id: "200109",
        name: "La Arena",
        province_id: "2001",
      },
      {
        id: "200110",
        name: "La Unión",
        province_id: "2001",
      },
      {
        id: "200111",
        name: "Las Lomas",
        province_id: "2001",
      },
      {
        id: "200114",
        name: "Tambo Grande",
        province_id: "2001",
      },
      {
        id: "200115",
        name: "Veintiseis de Octubre",
        province_id: "2001",
      },
      {
        id: "200201",
        name: "Ayabaca",
        province_id: "2002",
      },
      {
        id: "200202",
        name: "Frias",
        province_id: "2002",
      },
      {
        id: "200203",
        name: "Jilili",
        province_id: "2002",
      },
      {
        id: "200204",
        name: "Lagunas",
        province_id: "2002",
      },
      {
        id: "200205",
        name: "Montero",
        province_id: "2002",
      },
      {
        id: "200206",
        name: "Pacaipampa",
        province_id: "2002",
      },
      {
        id: "200207",
        name: "Paimas",
        province_id: "2002",
      },
      {
        id: "200208",
        name: "Sapillica",
        province_id: "2002",
      },
      {
        id: "200209",
        name: "Sicchez",
        province_id: "2002",
      },
      {
        id: "200210",
        name: "Suyo",
        province_id: "2002",
      },
      {
        id: "200301",
        name: "Huancabamba",
        province_id: "2003",
      },
      {
        id: "200302",
        name: "Canchaque",
        province_id: "2003",
      },
      {
        id: "200303",
        name: "El Carmen de la Frontera",
        province_id: "2003",
      },
      {
        id: "200304",
        name: "Huarmaca",
        province_id: "2003",
      },
      {
        id: "200305",
        name: "Lalaquiz",
        province_id: "2003",
      },
      {
        id: "200306",
        name: "San Miguel de El Faique",
        province_id: "2003",
      },
      {
        id: "200307",
        name: "Sondor",
        province_id: "2003",
      },
      {
        id: "200308",
        name: "Sondorillo",
        province_id: "2003",
      },
      {
        id: "200401",
        name: "Chulucanas",
        province_id: "2004",
      },
      {
        id: "200402",
        name: "Buenos Aires",
        province_id: "2004",
      },
      {
        id: "200403",
        name: "Chalaco",
        province_id: "2004",
      },
      {
        id: "200404",
        name: "La Matanza",
        province_id: "2004",
      },
      {
        id: "200405",
        name: "Morropon",
        province_id: "2004",
      },
      {
        id: "200406",
        name: "Salitral",
        province_id: "2004",
      },
      {
        id: "200407",
        name: "San Juan de Bigote",
        province_id: "2004",
      },
      {
        id: "200408",
        name: "Santa Catalina de Mossa",
        province_id: "2004",
      },
      {
        id: "200409",
        name: "Santo Domingo",
        province_id: "2004",
      },
      {
        id: "200410",
        name: "Yamango",
        province_id: "2004",
      },
      {
        id: "200501",
        name: "Paita",
        province_id: "2005",
      },
      {
        id: "200502",
        name: "Amotape",
        province_id: "2005",
      },
      {
        id: "200503",
        name: "Arenal",
        province_id: "2005",
      },
      {
        id: "200504",
        name: "Colan",
        province_id: "2005",
      },
      {
        id: "200505",
        name: "La Huaca",
        province_id: "2005",
      },
      {
        id: "200506",
        name: "Tamarindo",
        province_id: "2005",
      },
      {
        id: "200507",
        name: "Vichayal",
        province_id: "2005",
      },
      {
        id: "200601",
        name: "Sullana",
        province_id: "2006",
      },
      {
        id: "200602",
        name: "Bellavista",
        province_id: "2006",
      },
      {
        id: "200603",
        name: "Ignacio Escudero",
        province_id: "2006",
      },
      {
        id: "200604",
        name: "Lancones",
        province_id: "2006",
      },
      {
        id: "200605",
        name: "Marcavelica",
        province_id: "2006",
      },
      {
        id: "200606",
        name: "Miguel Checa",
        province_id: "2006",
      },
      {
        id: "200607",
        name: "Querecotillo",
        province_id: "2006",
      },
      {
        id: "200608",
        name: "Salitral",
        province_id: "2006",
      },
      {
        id: "200701",
        name: "Pariñas",
        province_id: "2007",
      },
      {
        id: "200702",
        name: "El Alto",
        province_id: "2007",
      },
      {
        id: "200703",
        name: "La Brea",
        province_id: "2007",
      },
      {
        id: "200704",
        name: "Lobitos",
        province_id: "2007",
      },
      {
        id: "200705",
        name: "Los Organos",
        province_id: "2007",
      },
      {
        id: "200706",
        name: "Mancora",
        province_id: "2007",
      },
      {
        id: "200801",
        name: "Sechura",
        province_id: "2008",
      },
      {
        id: "200802",
        name: "Bellavista de la Unión",
        province_id: "2008",
      },
      {
        id: "200803",
        name: "Bernal",
        province_id: "2008",
      },
      {
        id: "200804",
        name: "Cristo Nos Valga",
        province_id: "2008",
      },
      {
        id: "200805",
        name: "Vice",
        province_id: "2008",
      },
      {
        id: "200806",
        name: "Rinconada Llicuar",
        province_id: "2008",
      },
      {
        id: "210101",
        name: "Puno",
        province_id: "2101",
      },
      {
        id: "210102",
        name: "Acora",
        province_id: "2101",
      },
      {
        id: "210103",
        name: "Amantani",
        province_id: "2101",
      },
      {
        id: "210104",
        name: "Atuncolla",
        province_id: "2101",
      },
      {
        id: "210105",
        name: "Capachica",
        province_id: "2101",
      },
      {
        id: "210106",
        name: "Chucuito",
        province_id: "2101",
      },
      {
        id: "210107",
        name: "Coata",
        province_id: "2101",
      },
      {
        id: "210108",
        name: "Huata",
        province_id: "2101",
      },
      {
        id: "210109",
        name: "Mañazo",
        province_id: "2101",
      },
      {
        id: "210110",
        name: "Paucarcolla",
        province_id: "2101",
      },
      {
        id: "210111",
        name: "Pichacani",
        province_id: "2101",
      },
      {
        id: "210112",
        name: "Plateria",
        province_id: "2101",
      },
      {
        id: "210113",
        name: "San Antonio",
        province_id: "2101",
      },
      {
        id: "210114",
        name: "Tiquillaca",
        province_id: "2101",
      },
      {
        id: "210115",
        name: "Vilque",
        province_id: "2101",
      },
      {
        id: "210201",
        name: "Azángaro",
        province_id: "2102",
      },
      {
        id: "210202",
        name: "Achaya",
        province_id: "2102",
      },
      {
        id: "210203",
        name: "Arapa",
        province_id: "2102",
      },
      {
        id: "210204",
        name: "Asillo",
        province_id: "2102",
      },
      {
        id: "210205",
        name: "Caminaca",
        province_id: "2102",
      },
      {
        id: "210206",
        name: "Chupa",
        province_id: "2102",
      },
      {
        id: "210207",
        name: "José Domingo Choquehuanca",
        province_id: "2102",
      },
      {
        id: "210208",
        name: "Muñani",
        province_id: "2102",
      },
      {
        id: "210209",
        name: "Potoni",
        province_id: "2102",
      },
      {
        id: "210210",
        name: "Saman",
        province_id: "2102",
      },
      {
        id: "210211",
        name: "San Anton",
        province_id: "2102",
      },
      {
        id: "210212",
        name: "San José",
        province_id: "2102",
      },
      {
        id: "210213",
        name: "San Juan de Salinas",
        province_id: "2102",
      },
      {
        id: "210214",
        name: "Santiago de Pupuja",
        province_id: "2102",
      },
      {
        id: "210215",
        name: "Tirapata",
        province_id: "2102",
      },
      {
        id: "210301",
        name: "Macusani",
        province_id: "2103",
      },
      {
        id: "210302",
        name: "Ajoyani",
        province_id: "2103",
      },
      {
        id: "210303",
        name: "Ayapata",
        province_id: "2103",
      },
      {
        id: "210304",
        name: "Coasa",
        province_id: "2103",
      },
      {
        id: "210305",
        name: "Corani",
        province_id: "2103",
      },
      {
        id: "210306",
        name: "Crucero",
        province_id: "2103",
      },
      {
        id: "210307",
        name: "Ituata",
        province_id: "2103",
      },
      {
        id: "210308",
        name: "Ollachea",
        province_id: "2103",
      },
      {
        id: "210309",
        name: "San Gaban",
        province_id: "2103",
      },
      {
        id: "210310",
        name: "Usicayos",
        province_id: "2103",
      },
      {
        id: "210401",
        name: "Juli",
        province_id: "2104",
      },
      {
        id: "210402",
        name: "Desaguadero",
        province_id: "2104",
      },
      {
        id: "210403",
        name: "Huacullani",
        province_id: "2104",
      },
      {
        id: "210404",
        name: "Kelluyo",
        province_id: "2104",
      },
      {
        id: "210405",
        name: "Pisacoma",
        province_id: "2104",
      },
      {
        id: "210406",
        name: "Pomata",
        province_id: "2104",
      },
      {
        id: "210407",
        name: "Zepita",
        province_id: "2104",
      },
      {
        id: "210501",
        name: "Ilave",
        province_id: "2105",
      },
      {
        id: "210502",
        name: "Capazo",
        province_id: "2105",
      },
      {
        id: "210503",
        name: "Pilcuyo",
        province_id: "2105",
      },
      {
        id: "210504",
        name: "Santa Rosa",
        province_id: "2105",
      },
      {
        id: "210505",
        name: "Conduriri",
        province_id: "2105",
      },
      {
        id: "210601",
        name: "Huancane",
        province_id: "2106",
      },
      {
        id: "210602",
        name: "Cojata",
        province_id: "2106",
      },
      {
        id: "210603",
        name: "Huatasani",
        province_id: "2106",
      },
      {
        id: "210604",
        name: "Inchupalla",
        province_id: "2106",
      },
      {
        id: "210605",
        name: "Pusi",
        province_id: "2106",
      },
      {
        id: "210606",
        name: "Rosaspata",
        province_id: "2106",
      },
      {
        id: "210607",
        name: "Taraco",
        province_id: "2106",
      },
      {
        id: "210608",
        name: "Vilque Chico",
        province_id: "2106",
      },
      {
        id: "210701",
        name: "Lampa",
        province_id: "2107",
      },
      {
        id: "210702",
        name: "Cabanilla",
        province_id: "2107",
      },
      {
        id: "210703",
        name: "Calapuja",
        province_id: "2107",
      },
      {
        id: "210704",
        name: "Nicasio",
        province_id: "2107",
      },
      {
        id: "210705",
        name: "Ocuviri",
        province_id: "2107",
      },
      {
        id: "210706",
        name: "Palca",
        province_id: "2107",
      },
      {
        id: "210707",
        name: "Paratia",
        province_id: "2107",
      },
      {
        id: "210708",
        name: "Pucara",
        province_id: "2107",
      },
      {
        id: "210709",
        name: "Santa Lucia",
        province_id: "2107",
      },
      {
        id: "210710",
        name: "Vilavila",
        province_id: "2107",
      },
      {
        id: "210801",
        name: "Ayaviri",
        province_id: "2108",
      },
      {
        id: "210802",
        name: "Antauta",
        province_id: "2108",
      },
      {
        id: "210803",
        name: "Cupi",
        province_id: "2108",
      },
      {
        id: "210804",
        name: "Llalli",
        province_id: "2108",
      },
      {
        id: "210805",
        name: "Macari",
        province_id: "2108",
      },
      {
        id: "210806",
        name: "Nuñoa",
        province_id: "2108",
      },
      {
        id: "210807",
        name: "Orurillo",
        province_id: "2108",
      },
      {
        id: "210808",
        name: "Santa Rosa",
        province_id: "2108",
      },
      {
        id: "210809",
        name: "Umachiri",
        province_id: "2108",
      },
      {
        id: "210901",
        name: "Moho",
        province_id: "2109",
      },
      {
        id: "210902",
        name: "Conima",
        province_id: "2109",
      },
      {
        id: "210903",
        name: "Huayrapata",
        province_id: "2109",
      },
      {
        id: "210904",
        name: "Tilali",
        province_id: "2109",
      },
      {
        id: "211001",
        name: "Putina",
        province_id: "2110",
      },
      {
        id: "211002",
        name: "Ananea",
        province_id: "2110",
      },
      {
        id: "211003",
        name: "Pedro Vilca Apaza",
        province_id: "2110",
      },
      {
        id: "211004",
        name: "Quilcapuncu",
        province_id: "2110",
      },
      {
        id: "211005",
        name: "Sina",
        province_id: "2110",
      },
      {
        id: "211101",
        name: "Juliaca",
        province_id: "2111",
      },
      {
        id: "211102",
        name: "Cabana",
        province_id: "2111",
      },
      {
        id: "211103",
        name: "Cabanillas",
        province_id: "2111",
      },
      {
        id: "211104",
        name: "Caracoto",
        province_id: "2111",
      },
      {
        id: "211105",
        name: "San Miguel",
        province_id: "2111",
      },
      {
        id: "211201",
        name: "Sandia",
        province_id: "2112",
      },
      {
        id: "211202",
        name: "Cuyocuyo",
        province_id: "2112",
      },
      {
        id: "211203",
        name: "Limbani",
        province_id: "2112",
      },
      {
        id: "211204",
        name: "Patambuco",
        province_id: "2112",
      },
      {
        id: "211205",
        name: "Phara",
        province_id: "2112",
      },
      {
        id: "211206",
        name: "Quiaca",
        province_id: "2112",
      },
      {
        id: "211207",
        name: "San Juan del Oro",
        province_id: "2112",
      },
      {
        id: "211208",
        name: "Yanahuaya",
        province_id: "2112",
      },
      {
        id: "211209",
        name: "Alto Inambari",
        province_id: "2112",
      },
      {
        id: "211210",
        name: "San Pedro de Putina Punco",
        province_id: "2112",
      },
      {
        id: "211301",
        name: "Yunguyo",
        province_id: "2113",
      },
      {
        id: "211302",
        name: "Anapia",
        province_id: "2113",
      },
      {
        id: "211303",
        name: "Copani",
        province_id: "2113",
      },
      {
        id: "211304",
        name: "Cuturapi",
        province_id: "2113",
      },
      {
        id: "211305",
        name: "Ollaraya",
        province_id: "2113",
      },
      {
        id: "211306",
        name: "Tinicachi",
        province_id: "2113",
      },
      {
        id: "211307",
        name: "Unicachi",
        province_id: "2113",
      },
      {
        id: "220101",
        name: "Moyobamba",
        province_id: "2201",
      },
      {
        id: "220102",
        name: "Calzada",
        province_id: "2201",
      },
      {
        id: "220103",
        name: "Habana",
        province_id: "2201",
      },
      {
        id: "220104",
        name: "Jepelacio",
        province_id: "2201",
      },
      {
        id: "220105",
        name: "Soritor",
        province_id: "2201",
      },
      {
        id: "220106",
        name: "Yantalo",
        province_id: "2201",
      },
      {
        id: "220201",
        name: "Bellavista",
        province_id: "2202",
      },
      {
        id: "220202",
        name: "Alto Biavo",
        province_id: "2202",
      },
      {
        id: "220203",
        name: "Bajo Biavo",
        province_id: "2202",
      },
      {
        id: "220204",
        name: "Huallaga",
        province_id: "2202",
      },
      {
        id: "220205",
        name: "San Pablo",
        province_id: "2202",
      },
      {
        id: "220206",
        name: "San Rafael",
        province_id: "2202",
      },
      {
        id: "220301",
        name: "San José de Sisa",
        province_id: "2203",
      },
      {
        id: "220302",
        name: "Agua Blanca",
        province_id: "2203",
      },
      {
        id: "220303",
        name: "San Martín",
        province_id: "2203",
      },
      {
        id: "220304",
        name: "Santa Rosa",
        province_id: "2203",
      },
      {
        id: "220305",
        name: "Shatoja",
        province_id: "2203",
      },
      {
        id: "220401",
        name: "Saposoa",
        province_id: "2204",
      },
      {
        id: "220402",
        name: "Alto Saposoa",
        province_id: "2204",
      },
      {
        id: "220403",
        name: "El Eslabón",
        province_id: "2204",
      },
      {
        id: "220404",
        name: "Piscoyacu",
        province_id: "2204",
      },
      {
        id: "220405",
        name: "Sacanche",
        province_id: "2204",
      },
      {
        id: "220406",
        name: "Tingo de Saposoa",
        province_id: "2204",
      },
      {
        id: "220501",
        name: "Lamas",
        province_id: "2205",
      },
      {
        id: "220502",
        name: "Alonso de Alvarado",
        province_id: "2205",
      },
      {
        id: "220503",
        name: "Barranquita",
        province_id: "2205",
      },
      {
        id: "220504",
        name: "Caynarachi",
        province_id: "2205",
      },
      {
        id: "220505",
        name: "Cuñumbuqui",
        province_id: "2205",
      },
      {
        id: "220506",
        name: "Pinto Recodo",
        province_id: "2205",
      },
      {
        id: "220507",
        name: "Rumisapa",
        province_id: "2205",
      },
      {
        id: "220508",
        name: "San Roque de Cumbaza",
        province_id: "2205",
      },
      {
        id: "220509",
        name: "Shanao",
        province_id: "2205",
      },
      {
        id: "220510",
        name: "Tabalosos",
        province_id: "2205",
      },
      {
        id: "220511",
        name: "Zapatero",
        province_id: "2205",
      },
      {
        id: "220601",
        name: "Juanjuí",
        province_id: "2206",
      },
      {
        id: "220602",
        name: "Campanilla",
        province_id: "2206",
      },
      {
        id: "220603",
        name: "Huicungo",
        province_id: "2206",
      },
      {
        id: "220604",
        name: "Pachiza",
        province_id: "2206",
      },
      {
        id: "220605",
        name: "Pajarillo",
        province_id: "2206",
      },
      {
        id: "220701",
        name: "Picota",
        province_id: "2207",
      },
      {
        id: "220702",
        name: "Buenos Aires",
        province_id: "2207",
      },
      {
        id: "220703",
        name: "Caspisapa",
        province_id: "2207",
      },
      {
        id: "220704",
        name: "Pilluana",
        province_id: "2207",
      },
      {
        id: "220705",
        name: "Pucacaca",
        province_id: "2207",
      },
      {
        id: "220706",
        name: "San Cristóbal",
        province_id: "2207",
      },
      {
        id: "220707",
        name: "San Hilarión",
        province_id: "2207",
      },
      {
        id: "220708",
        name: "Shamboyacu",
        province_id: "2207",
      },
      {
        id: "220709",
        name: "Tingo de Ponasa",
        province_id: "2207",
      },
      {
        id: "220710",
        name: "Tres Unidos",
        province_id: "2207",
      },
      {
        id: "220801",
        name: "Rioja",
        province_id: "2208",
      },
      {
        id: "220802",
        name: "Awajun",
        province_id: "2208",
      },
      {
        id: "220803",
        name: "Elías Soplin Vargas",
        province_id: "2208",
      },
      {
        id: "220804",
        name: "Nueva Cajamarca",
        province_id: "2208",
      },
      {
        id: "220805",
        name: "Pardo Miguel",
        province_id: "2208",
      },
      {
        id: "220806",
        name: "Posic",
        province_id: "2208",
      },
      {
        id: "220807",
        name: "San Fernando",
        province_id: "2208",
      },
      {
        id: "220808",
        name: "Yorongos",
        province_id: "2208",
      },
      {
        id: "220809",
        name: "Yuracyacu",
        province_id: "2208",
      },
      {
        id: "220901",
        name: "Tarapoto",
        province_id: "2209",
      },
      {
        id: "220902",
        name: "Alberto Leveau",
        province_id: "2209",
      },
      {
        id: "220903",
        name: "Cacatachi",
        province_id: "2209",
      },
      {
        id: "220904",
        name: "Chazuta",
        province_id: "2209",
      },
      {
        id: "220905",
        name: "Chipurana",
        province_id: "2209",
      },
      {
        id: "220906",
        name: "El Porvenir",
        province_id: "2209",
      },
      {
        id: "220907",
        name: "Huimbayoc",
        province_id: "2209",
      },
      {
        id: "220908",
        name: "Juan Guerra",
        province_id: "2209",
      },
      {
        id: "220909",
        name: "La Banda de Shilcayo",
        province_id: "2209",
      },
      {
        id: "220910",
        name: "Morales",
        province_id: "2209",
      },
      {
        id: "220911",
        name: "Papaplaya",
        province_id: "2209",
      },
      {
        id: "220912",
        name: "San Antonio",
        province_id: "2209",
      },
      {
        id: "220913",
        name: "Sauce",
        province_id: "2209",
      },
      {
        id: "220914",
        name: "Shapaja",
        province_id: "2209",
      },
      {
        id: "221001",
        name: "Tocache",
        province_id: "2210",
      },
      {
        id: "221002",
        name: "Nuevo Progreso",
        province_id: "2210",
      },
      {
        id: "221003",
        name: "Polvora",
        province_id: "2210",
      },
      {
        id: "221004",
        name: "Shunte",
        province_id: "2210",
      },
      {
        id: "221005",
        name: "Uchiza",
        province_id: "2210",
      },
      {
        id: "230101",
        name: "Tacna",
        province_id: "2301",
      },
      {
        id: "230102",
        name: "Alto de la Alianza",
        province_id: "2301",
      },
      {
        id: "230103",
        name: "Calana",
        province_id: "2301",
      },
      {
        id: "230104",
        name: "Ciudad Nueva",
        province_id: "2301",
      },
      {
        id: "230105",
        name: "Inclan",
        province_id: "2301",
      },
      {
        id: "230106",
        name: "Pachia",
        province_id: "2301",
      },
      {
        id: "230107",
        name: "Palca",
        province_id: "2301",
      },
      {
        id: "230108",
        name: "Pocollay",
        province_id: "2301",
      },
      {
        id: "230109",
        name: "Sama",
        province_id: "2301",
      },
      {
        id: "230110",
        name: "Coronel Gregorio Albarracín Lanchipa",
        province_id: "2301",
      },
      {
        id: "230111",
        name: "La Yarada los Palos",
        province_id: "2301",
      },
      {
        id: "230201",
        name: "Candarave",
        province_id: "2302",
      },
      {
        id: "230202",
        name: "Cairani",
        province_id: "2302",
      },
      {
        id: "230203",
        name: "Camilaca",
        province_id: "2302",
      },
      {
        id: "230204",
        name: "Curibaya",
        province_id: "2302",
      },
      {
        id: "230205",
        name: "Huanuara",
        province_id: "2302",
      },
      {
        id: "230206",
        name: "Quilahuani",
        province_id: "2302",
      },
      {
        id: "230301",
        name: "Locumba",
        province_id: "2303",
      },
      {
        id: "230302",
        name: "Ilabaya",
        province_id: "2303",
      },
      {
        id: "230303",
        name: "Ite",
        province_id: "2303",
      },
      {
        id: "230401",
        name: "Tarata",
        province_id: "2304",
      },
      {
        id: "230402",
        name: "Héroes Albarracín",
        province_id: "2304",
      },
      {
        id: "230403",
        name: "Estique",
        province_id: "2304",
      },
      {
        id: "230404",
        name: "Estique-Pampa",
        province_id: "2304",
      },
      {
        id: "230405",
        name: "Sitajara",
        province_id: "2304",
      },
      {
        id: "230406",
        name: "Susapaya",
        province_id: "2304",
      },
      {
        id: "230407",
        name: "Tarucachi",
        province_id: "2304",
      },
      {
        id: "230408",
        name: "Ticaco",
        province_id: "2304",
      },
      {
        id: "240101",
        name: "Tumbes",
        province_id: "2401",
      },
      {
        id: "240102",
        name: "Corrales",
        province_id: "2401",
      },
      {
        id: "240103",
        name: "La Cruz",
        province_id: "2401",
      },
      {
        id: "240104",
        name: "Pampas de Hospital",
        province_id: "2401",
      },
      {
        id: "240105",
        name: "San Jacinto",
        province_id: "2401",
      },
      {
        id: "240106",
        name: "San Juan de la Virgen",
        province_id: "2401",
      },
      {
        id: "240201",
        name: "Zorritos",
        province_id: "2402",
      },
      {
        id: "240202",
        name: "Casitas",
        province_id: "2402",
      },
      {
        id: "240203",
        name: "Canoas de Punta Sal",
        province_id: "2402",
      },
      {
        id: "240301",
        name: "Zarumilla",
        province_id: "2403",
      },
      {
        id: "240302",
        name: "Aguas Verdes",
        province_id: "2403",
      },
      {
        id: "240303",
        name: "Matapalo",
        province_id: "2403",
      },
      {
        id: "240304",
        name: "Papayal",
        province_id: "2403",
      },
      {
        id: "250101",
        name: "Calleria",
        province_id: "2501",
      },
      {
        id: "250102",
        name: "Campoverde",
        province_id: "2501",
      },
      {
        id: "250103",
        name: "Iparia",
        province_id: "2501",
      },
      {
        id: "250104",
        name: "Masisea",
        province_id: "2501",
      },
      {
        id: "250105",
        name: "Yarinacocha",
        province_id: "2501",
      },
      {
        id: "250106",
        name: "Nueva Requena",
        province_id: "2501",
      },
      {
        id: "250107",
        name: "Manantay",
        province_id: "2501",
      },
      {
        id: "250201",
        name: "Raymondi",
        province_id: "2502",
      },
      {
        id: "250202",
        name: "Sepahua",
        province_id: "2502",
      },
      {
        id: "250203",
        name: "Tahuania",
        province_id: "2502",
      },
      {
        id: "250204",
        name: "Yurua",
        province_id: "2502",
      },
      {
        id: "250301",
        name: "Padre Abad",
        province_id: "2503",
      },
      {
        id: "250302",
        name: "Irazola",
        province_id: "2503",
      },
      {
        id: "250303",
        name: "Curimana",
        province_id: "2503",
      },
      {
        id: "250304",
        name: "Neshuya",
        province_id: "2503",
      },
      {
        id: "250305",
        name: "Alexander Von Humboldt",
        province_id: "2503",
      },
      {
        id: "250401",
        name: "Purus",
        province_id: "2504",
      },
    ],
  });
  const range = await prisma.range.createMany({
    data: [
      {
        name: "S/ 1000 a S/ 1500",
      },
      {
        name: "S/ 1001 a S/ 2000",
      },
      {
        name: "S/ 2001 a S/ 2500",
      },
      {
        name: "S/ 2501 a S/ 3000",
      },
      {
        name: "S/ 3000 a más",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });