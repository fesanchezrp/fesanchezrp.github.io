var entity = Vue.component('entity', {
  props: ['entityId'],
    data : function(){
        return {
          formGroup: null,
          totalPaso: 4,
          pasoActual: 1,
          net: {},
          entities: [
            {DESTDE1: 'Adquiriente', LCMRUC: '8468864', LCMCOD: 'ALN001', LCMDES: 'Alignet', LCMRSO: 'Alignet C.A'},
            {DESTDE1: 'Empresa', LCMRUC: '65456', LCMCOD: 'ALN002', LCMDES: 'Alignet 2', LCMRSO: 'Alignet C.A 2'},
            {DESTDE1: 'Comercio', LCMRUC: '54564564', LCMCOD: 'PCT001', LCMDES: 'Peceti 1', LCMRSO: 'Peceti C.A 1'},
            {DESTDE1: 'Comercio', LCMRUC: '564654', LCMCOD: 'PCT002', LCMDES: 'Peceti 2', LCMRSO: 'Peceti C.A 2'},
            {DESTDE1: 'Comercio', LCMRUC: '5456456', LCMCOD: 'ALN005', LCMDES: 'Alignet 5', LCMRSO: 'Alignet C.A 5'},
            {DESTDE1: 'Empresa', LCMRUC: '787887', LCMCOD: 'ALN006', LCMDES: 'Alignet 6', LCMRSO: 'Alignet C.A 6'},
            {DESTDE1: 'Empresa', LCMRUC: '25777858', LCMCOD: 'ALN010', LCMDES: 'Alignet 10', LCMRSO: 'Alignet  C.A 10'},
            {DESTDE1: 'Adquiriente', LCMRUC: '96859698', LCMCOD: 'PIC001', LCMDES: 'Pico 1', LCMRSO: 'Pico C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '2256859', LCMCOD: 'MAS001', LCMDES: 'Mastedo 1', LCMRSO: 'Mastedo C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '7485888', LCMCOD: 'MER001', LCMDES: 'Mercusys 1', LCMRSO: 'Mercusys C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '1245125', LCMCOD: 'CUA001', LCMDES: 'Cuadaro 1', LCMRSO: 'Cuadaro C.A 1'},
            {DESTDE1: 'Adquiriente', LCMRUC: '125125', LCMCOD: 'RAS001', LCMDES: 'Rasa 1', LCMRSO: 'Rasa C.A 1'},
          ],
          services:  [
            {
              "LSVCOD": "00001N",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "VIS",
              "LSVMON": "604"
            },
            {
              "LSVCOD": "00001N",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "VIS",
              "LSVMON": "840"
            },
            {
              "LSVCOD": "00002I",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "MAS",
              "LSVMON": "604"
            },
            {
              "LSVCOD": "00002I",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "MAS",
              "LSVMON": "840"
            },
            {
              "LSVCOD": "00002I",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "VIS",
              "LSVMON": "604"
            },
            {
              "LSVCOD": "00002I",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "VIS",
              "LSVMON": "840"
            },
            {
              "LSVCOD": "00003E",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "AME",
              "LSVMON": "604"
            },
            {
              "LSVCOD": "00003E",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "AME",
              "LSVMON": "840"
            },
            {
              "LSVCOD": "00004D",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "DIN",
              "LSVMON": "604"
            },
            {
              "LSVCOD": "00004D",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "DIN",
              "LSVMON": "840"
            },
            {
              "LSVCOD": "00005S",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "00007A",
              "LSVCNL": "ECO",
              "LSVMEP": "SAF",
              "LSVMON": "604"
            },
            {
              "LSVCOD": "00005S",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "00007A",
              "LSVCNL": "ECO",
              "LSVMEP": "SAF",
              "LSVMON": "840"
            },
            {
              "LSVCOD": "00006P",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "00007A",
              "LSVCNL": "ECO",
              "LSVMEP": "PAG",
              "LSVMON": "604"
            },
            {
              "LSVCOD": "00006P",
              "LSVADQ": "",
              "LSVCPA": "",
              "LSVCFA": "00007A",
              "LSVCNL": "ECO",
              "LSVMEP": "PAG",
              "LSVMON": "840"
            },
            {
              "LSVCOD": "00007A",
              "LSVADQ": "00001N",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "VIS",
              "LSVMON": "604"
            },
            {
              "LSVCOD": "00007A",
              "LSVADQ": "00001N",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "VIS",
              "LSVMON": "840"
            },
            {
              "LSVCOD": "00007A",
              "LSVADQ": "00002I",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "MAS",
              "LSVMON": "604"
            },
            {
              "LSVCOD": "00007A",
              "LSVADQ": "00002I",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "MAS",
              "LSVMON": "840"
            },
            {
              "LSVCOD": "00007A",
              "LSVADQ": "00002I",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "VIS",
              "LSVMON": "604"
            },
            {
              "LSVCOD": "00007A",
              "LSVADQ": "00002I",
              "LSVCPA": "",
              "LSVCFA": "",
              "LSVCNL": "ECO",
              "LSVMEP": "VIS",
              "LSVMON": "840"
            }
          ],
          calendars : [
            {
              "LCLCOD": "13525",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "14754",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "10310",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "14989",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "7764",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "14458",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "8304",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "8229",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "8565",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "7382",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "6679",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "14576",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "8861",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "5769",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "8781",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "8743",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "12564",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "12255",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "7458",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": "8890",
              "LCLTTR": "V",
              "LCLIDL": "D",
              "LCLTDL": "",
              "LCLDLI": "",
              "LCLILF": "",
              "LCLIMS": "",
              "LCLTPD": "",
              "LCLNRD": "0",
              "LCLIDP": "D",
              "LCLTDP": "",
              "LCLDPA": "000000000000",
              "LCLFLG": ""
            },
            {
              "LCLCOD": ""
            }
          ],
          commisions: [
            {
              "LASCOD": "001AS",
              "LASIDE": "8092",
              "LASADP": "00001N",
              "LASCPA": "333372233",
              "LASADT": "",
              "LASTPC": "L",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "010",
              "LASTCO": "002",
              "LASTIP": "",
              "LASLOC": "",
              "LASMOC": "604",
              "LASVLF": "10.0",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "JREYNAFARG",
              "LASFUM": "2021-07-21 16:32:32.552017",
              "LASUAM": "",
              "LASFAM": "2021-07-21 16:32:32.316000",
              "LASFLG": "N  M"
            },
            {
              "LASCOD": "10233",
              "LASIDE": "10233",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "001",
              "LASESQ": "001",
              "LASTCO": "001",
              "LASTIP": "",
              "LASLOC": "",
              "LASMOC": "840",
              "LASVLF": ".07",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:37.036366",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:37.033000",
              "LASFLG": "N     S"
            },
            {
              "LASCOD": "10233",
              "LASIDE": "10233",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "015",
              "LASTCO": "002",
              "LASTIP": "TC",
              "LASLOC": "N",
              "LASMOC": "604",
              "LASVLF": "2.7",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:33.706979",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:33.703000",
              "LASFLG": "N"
            },
            {
              "LASCOD": "10233",
              "LASIDE": "10233",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "015",
              "LASTCO": "002",
              "LASTIP": "TD",
              "LASLOC": "N",
              "LASMOC": "604",
              "LASVLF": "2.7",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:33.593299",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:33.590000",
              "LASFLG": ""
            },
            {
              "LASCOD": "10233",
              "LASIDE": "10233",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "029",
              "LASTCO": "002",
              "LASTIP": "",
              "LASLOC": "I",
              "LASMOC": "604",
              "LASVLF": "3.9",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:35.111228",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:35.108000",
              "LASFLG": "N"
            },
            {
              "LASCOD": "10233",
              "LASIDE": "10233",
              "LASADP": "00003E",
              "LASCPA": "004059608",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "AME",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "010",
              "LASTCO": "002",
              "LASTIP": "",
              "LASLOC": "",
              "LASMOC": "604",
              "LASVLF": "3.5",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:33.481063",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:33.477000",
              "LASFLG": "N"
            },
            {
              "LASCOD": "10233",
              "LASIDE": "10233",
              "LASADP": "00004D",
              "LASCPA": "1001235120",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "DIN",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "010",
              "LASTCO": "002",
              "LASTIP": "",
              "LASLOC": "",
              "LASMOC": "604",
              "LASVLF": "2.75",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:34.401279",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:34.398000",
              "LASFLG": "N"
            },
            {
              "LASCOD": "10242",
              "LASIDE": "10242",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "001",
              "LASESQ": "001",
              "LASTCO": "001",
              "LASTIP": "",
              "LASLOC": "",
              "LASMOC": "840",
              "LASVLF": ".07",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:42.473092",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:42.469000",
              "LASFLG": "N     S"
            },
            {
              "LASCOD": "10242",
              "LASIDE": "10242",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "015",
              "LASTCO": "002",
              "LASTIP": "TC",
              "LASLOC": "N",
              "LASMOC": "604",
              "LASVLF": "2.7",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:37.243535",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:37.240000",
              "LASFLG": "N"
            },
            {
              "LASCOD": "10242",
              "LASIDE": "10242",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "015",
              "LASTCO": "002",
              "LASTIP": "TD",
              "LASLOC": "N",
              "LASMOC": "604",
              "LASVLF": "2.7",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:44.707639",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:44.704000",
              "LASFLG": ""
            },
            {
              "LASCOD": "10242",
              "LASIDE": "10242",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "029",
              "LASTCO": "002",
              "LASTIP": "",
              "LASLOC": "I",
              "LASMOC": "604",
              "LASVLF": "3.9",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:37.369016",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:37.365000",
              "LASFLG": "N"
            },
            {
              "LASCOD": "10242",
              "LASIDE": "10242",
              "LASADP": "00002I",
              "LASCPA": "004059596",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "MAS",
              "LASMON": "604",
              "LASCNC": "001",
              "LASESQ": "001",
              "LASTCO": "001",
              "LASTIP": "",
              "LASLOC": "",
              "LASMOC": "840",
              "LASVLF": ".065",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:37.781534",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:37.778000",
              "LASFLG": "N"
            },
            {
              "LASCOD": "10242",
              "LASIDE": "10242",
              "LASADP": "00002I",
              "LASCPA": "004059596",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "MAS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "029",
              "LASTCO": "002",
              "LASTIP": "",
              "LASLOC": "I",
              "LASMOC": "604",
              "LASVLF": "3.95",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:39.980742",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:39.977000",
              "LASFLG": "N"
            },
            {
              "LASCOD": "10242",
              "LASIDE": "10242",
              "LASADP": "00002I",
              "LASCPA": "004059596",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "MAS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "029",
              "LASTCO": "002",
              "LASTIP": "",
              "LASLOC": "N",
              "LASMOC": "604",
              "LASVLF": "2.75",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:38.052784",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:38.049000",
              "LASFLG": ""
            },
            {
              "LASCOD": "10242",
              "LASIDE": "10242",
              "LASADP": "00003E",
              "LASCPA": "004059596",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "AME",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "010",
              "LASTCO": "002",
              "LASTIP": "",
              "LASLOC": "",
              "LASMOC": "604",
              "LASVLF": "3.5",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:37.243643",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:37.240000",
              "LASFLG": "N"
            },
            {
              "LASCOD": "10242",
              "LASIDE": "10242",
              "LASADP": "00004D",
              "LASCPA": "1001234084",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "DIN",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "010",
              "LASTCO": "002",
              "LASTIP": "",
              "LASLOC": "",
              "LASMOC": "604",
              "LASVLF": "2.75",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:37.473519",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:37.470000",
              "LASFLG": "N"
            },
            {
              "LASCOD": "10243",
              "LASIDE": "10243",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "001",
              "LASESQ": "001",
              "LASTCO": "001",
              "LASTIP": "",
              "LASLOC": "",
              "LASMOC": "840",
              "LASVLF": ".07",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:40.401181",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:40.397000",
              "LASFLG": "N     S"
            },
            {
              "LASCOD": "10243",
              "LASIDE": "10243",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "015",
              "LASTCO": "002",
              "LASTIP": "TC",
              "LASLOC": "N",
              "LASMOC": "604",
              "LASVLF": "2.7",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:44.595188",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:44.591000",
              "LASFLG": "N"
            },
            {
              "LASCOD": "10243",
              "LASIDE": "10243",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "015",
              "LASTCO": "002",
              "LASTIP": "TD",
              "LASLOC": "N",
              "LASMOC": "604",
              "LASVLF": "2.7",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:41.239993",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:41.236000",
              "LASFLG": ""
            },
            {
              "LASCOD": "10243",
              "LASIDE": "10243",
              "LASADP": "00001N",
              "LASCPA": "333372205",
              "LASADT": "",
              "LASTPC": "C",
              "LASTTR": "V",
              "LASCNL": "ECO",
              "LASMEP": "VIS",
              "LASMON": "604",
              "LASCNC": "002",
              "LASESQ": "029",
              "LASTCO": "002",
              "LASTIP": "",
              "LASLOC": "I",
              "LASMOC": "604",
              "LASVLF": "3.9",
              "LASTVL": "",
              "LASIM1": "IGV",
              "LASIM2": "",
              "LASIM3": "",
              "LASIM4": "",
              "LASIM5": "",
              "LASICA": "0",
              "LASBIN": "0",
              "LASMCC": "",
              "LASFVI": "20210101",
              "LASFVF": "0",
              "LASIDP": "",
              "LASUUM": "ASEMINARIO",
              "LASFUM": "2021-07-16 20:44:44.742928",
              "LASUAM": "",
              "LASFAM": "2021-07-16 20:44:44.739000",
              "LASFLG": "N"
            }
          ],
          bankAccounts: [
            {
              "LCBCCO": "10233",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "SCT",
              "LCBCUD": "01118500010002784164",
              "LCBTID": "B",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:05.646901",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:05.393000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10242",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1932447382029",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:31.914640",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:31.912000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10243",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1932169340024",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:32.063590",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:32.061000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10244",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1942553956033",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:32.196511",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:32.194000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10245",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1942229850036",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:32.245633",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:32.243000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10312",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1932410436037",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:35.924620",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:35.915000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10328",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BBVA",
              "LCBCUD": "01133300010011573629",
              "LCBTID": "B",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:36.145961",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:36.143000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10343",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1942525970047",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:36.282186",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:36.280000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10359",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912615450196",
              "LCBTIO": "C",
              "LCBMOO": "840",
              "LCBBAD": "BCP",
              "LCBCUD": "28592357912185",
              "LCBTID": "A",
              "LCBMOD": "840",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:50:31.111682",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:50:31.109000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10436",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1931764418002",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:48.489365",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:48.487000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10437",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1931764418002",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:09.136186",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:08.771000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10439",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1931764418002",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:11.498744",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:11.496000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10443",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912615450196",
              "LCBTIO": "C",
              "LCBMOO": "840",
              "LCBBAD": "BCP",
              "LCBCUD": "1932500457150",
              "LCBTID": "C",
              "LCBMOD": "840",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:50:32.472615",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:50:31.253000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10469",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "21591685500011",
              "LCBTID": "A",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:31.477360",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:31.458000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10475",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1942522497066",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:32.389237",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:32.386000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10677",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "38592590434057",
              "LCBTID": "A",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:32.657386",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:32.655000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10692",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912615450196",
              "LCBTIO": "C",
              "LCBMOO": "840",
              "LCBBAD": "IBK",
              "LCBCUD": "00329600300255800117",
              "LCBTID": "B",
              "LCBMOD": "840",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:50:33.445185",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:50:33.443000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10775",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1932523433021",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:33.585940",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:33.191000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10803",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1910071399000",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:33.989705",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:33.926000",
              "LCBFLG": ""
            },
            {
              "LCBCCO": "10812",
              "LCBCRR": "001",
              "LCBBAO": "BCP",
              "LCBCUO": "1912616311083",
              "LCBTIO": "C",
              "LCBMOO": "604",
              "LCBBAD": "BCP",
              "LCBCUD": "1910153616075",
              "LCBTID": "C",
              "LCBMOD": "604",
              "LCBTIT": "",
              "LCBTER": "N",
              "LCBNOT": "",
              "LCBIDN": "",
              "LCBRUT": "",
              "LCBSDE": "",
              "LCBPRD": "",
              "LCBAGN": "",
              "LCBICP": "S",
              "LCBUUM": "QTMHHTTP",
              "LCBFUM": "2021-07-09 10:46:32.983615",
              "LCBUAM": "",
              "LCBFAM": "2021-07-09 10:46:32.974000",
              "LCBFLG": ""
            }
          ],
          thirdParties: [
            {
              "LITCOD": "00000000005",
              "LITIDT": "00000000006",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "00000000003",
              "LITIDT": "00000000009",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "0123455",
              "LITIDT": "0123452",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "00000000009",
              "LITIDT": "00000000006",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "00000000016",
              "LITIDT": "00000000006",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "00000000012",
              "LITIDT": "00000000009",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "00000000002",
              "LITIDT": "00000000006",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "00000000017",
              "LITIDT": "00000000006",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "00000000011",
              "LITIDT": "00000000009",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "7522",
              "LITIDT": "00000000009",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "8092",
              "LITIDT": "00000000009",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "10312",
              "LITIDT": "777",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "C002",
              "LITIDT": "00000000009",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "C006",
              "LITIDT": "00000000009",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "456786",
              "LITIDT": "00000000009",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "456786",
              "LITIDT": "00005",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "C003",
              "LITIDT": "00000000009",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "C003",
              "LITIDT": "00000000010",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "C003",
              "LITIDT": "A1",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            },
            {
              "LITCOD": "08904",
              "LITIDT": "00000000009",
              "LITFUM": "0001-01-01 00:00:00.000000",
              "LITUUM": "",
              "LITFAM": "0001-01-01 00:00:00.000000",
              "LITUAM": "",
              "LITFLG": ""
            }
          ]
        }
    },
    mounted: function(){
      console.log('mounted')
      this.net = this.entities.find((entity)=> this.entityId == entity.LCMCOD)
      if(!this.net) alert('Entidad no encontrada')
      this.formGroup = document.getElementById('entities-form-group row')
      this.$EventBus.$emit('toolboxOperationChange', [])
      this.formGroup = document.getElementById('entities-form-group')
    },
    methods:{
      actualizarEntidad: function(){
        this.$router.push('/entities/new')
      }
    },
    watch: {
      $route(to, from) {
        this.net = this.entities.find((entity)=> this.entityId == entity.LCMCOD)
        if(!this.net) alert('Entidad no encontrada')
      }
    },
    computed: {
      forms: function(){
        return document.getElementsByClassName('subform') || []
      },
      actions: function(){
        return [
          {
            title : 'Operaciones',
            actions: [
              {title: 'Actualizar entidad', icon: 'update', action: ()=> this.actualizarEntidad()},
              {title: 'Eliminar entidad', icon: 'delete'},
            ]
          }
        ]
      },
      headersServices() {
            /*
            if(this.show_section){
                return ['ALN0252', 'ALN0259','ALN0160','ALN0209'].map(ml400 => ({ ml400 , sortable: true }))
            }*/
            return ['Adquiriente / Patrocinado', 'Código Patrocinado','Código Facilitador', 'Canal',' Método de pago', 'Moneda']
            // ml400.labels.ALN0046
            /*return [
                {text:this.ml400.labels.AWL0072, value: 'LRLRED'}, 
                {text:this.ml400.labels.AWL0020, value: 'LRLDSC'}, 
                {text:this.ml400.labels.AWL0301, value: 'VROL'},
                
            ]*/
            
        },
        dataTableServices() {
            const props = {
                style: "cursor:pointer;"
            }
            
            return this.services.map(data =>  {
                        let base = {
                            props,
                            click: 'clickEvent',
                            td_class: data.VROL == 'ORIGEN' || data.VROL == 'AMBOS'  ? 'menuOrigen' : 'menuDestino',
                            parms: {
                                LSVADQ: data.LSVADQ,
                                LSVCPA: data.LSVCPA,
                                LSVCFA: data.LSVCFA,
                                LSVCNL: data.LSVCNL,
                                LSVMEP: data.LSVMEP,
                                LSVMON: data.LSVMON
                            },        
                        }
                        let columns = [
                           { value: data.LSVADQ, ...base},
                           { value: data.LSVCPA, ...base},                        	
                            { value: data.LSVCFA, ...base},
                            { value: data.LSVCNL, ...base},                        	
                            { value: data.LSVMEP, ...base},
                            { value: data.LSVMON, ...base},

                        ]
                        return columns
                        
            }); 
            
        },
        headersBankAccounts() {
            /*
            if(this.show_section){
                return ['ALN0252', 'ALN0259','ALN0160','ALN0209'].map(ml400 => ({ ml400 , sortable: true }))
            }*/
            return ['Banco Origen', 'Cuenta Origen','Cuenta Destino', 'Cuenta principal']
            // ml400.labels.ALN0046
            /*return [
                {text:this.ml400.labels.AWL0072, value: 'LRLRED'}, 
                {text:this.ml400.labels.AWL0020, value: 'LRLDSC'}, 
                {text:this.ml400.labels.AWL0301, value: 'VROL'},
                
            ]*/
            
        },
        dataTableBankAccounts() {
            const props = {
                style: "cursor:pointer;"
            }
            
            return this.bankAccounts.map(data =>  {
                        let base = {
                            props,
                            click: 'clickEvent',
                            td_class: data.VROL == 'ORIGEN' || data.VROL == 'AMBOS'  ? 'menuOrigen' : 'menuDestino',
                            parms: {
                              LCBBAO: data.LCBBAO,
                              LCBCUO: data.LCBCUO,
                              LCBBAO: data.LCBBAO,
                              LCBCUD: data.LCBCUD
                            }
                        }
                        let columns = [
                           { value: data.LCBBAO, ...base},
                           { value: data.LCBCUO, ...base},                        	
                           { value: data.LCBBAO, ...base},
                           { value: data.LCBCUD, ...base},

                        ]
                        return columns
                        
            }); 
            
        },
        headersCommisions() {
          /*
          if(this.show_section){
              return ['ALN0252', 'ALN0259','ALN0160','ALN0209'].map(ml400 => ({ ml400 , sortable: true }))
          }*/
          return ['Canal', 'Metodo de pago','Moneda', 'Concepto de comisión','Esquema', 'Moneda']
          // ml400.labels.ALN0046
          /*return [
              {text:this.ml400.labels.AWL0072, value: 'LRLRED'}, 
              {text:this.ml400.labels.AWL0020, value: 'LRLDSC'}, 
              {text:this.ml400.labels.AWL0301, value: 'VROL'},
              
          ]*/
          
      },
      dataTableCommisions() {
          const props = {
              style: "cursor:pointer;"
          }
          
          return this.commisions.map(data =>  {
                      let base = {
                          props,
                          click: 'clickEvent',
                          td_class: data.VROL == 'ORIGEN' || data.VROL == 'AMBOS'  ? 'menuOrigen' : 'menuDestino',
                          parms: {
                              LASCNL: data.LASCNL,
                              LASMEP: data.LASMEP,
                              LASMON: data.LASMON,
                              LASCNC: data.LASCNC,
                              LASESQ: data.LASESQ,
                              LASMON: data.LASMON
                          },        
                      }
                      let columns = [
                         { value: data.LASCNL, ...base},
                         { value: data.LASMEP, ...base},                        	
                          { value: data.LASMON, ...base},
                          { value: data.LASCNC, ...base},                        	
                          { value: data.LASESQ, ...base},
                          { value: data.LASMON, ...base},

                      ]
                      return columns
                      
          }); 
          
      },
    },
    template: `<div class="row">
  <div class="col">
    <!-- <div class="information-header">
  <h4 class="information-header-title">
Acme C.A<span class="information-header-subtitle">ACME001</span></h4>
  <step-bar :totalSteps="totalPaso" :currentStep="pasoActual" class="d-none"></step-bar>
</div> -->
    <div id="entities-form-group row" class="input-form">
      <form class="subform">
        <h4 class="section-header">Datos Generales</h4>
        <div class="form-row">
          <div class="form-group row col-lg-3">
            <label class="font-weight-bold col-auto col-form-label col-form-label-sm" for="entity-code">Código de entidad: </label>
            <input
              class="col form-control-plaintext form-control-sm"
              type="text"
              name="entity-code"
              id="entity-code"
              v-model="net.LCMCOD"
              readonly
              required
            />
            <div class="invalid-feedback">Este campo es obligatorio</div>
          </div>
          <div class="form-group row col-lg-3">
            <label class="col-auto font-weight-bold col-form-label col-form-label-sm" for="entity-name">Nombre: </label>
            <input
              class="col form-control-plaintext form-control-sm"
              type="text"
              name="entity-name"
              v-model="net.LCMDES"
              id="entity-name"
              readonly
            />
          </div>
          <div class="form-group row col-lg-3">
            <label class="col-auto font-weight-bold col-form-label col-form-label-sm" for="entity-type">Tipo de entidad: </label>
            <input class="col form-control-plaintext form-control-sm" name="entity-type" id="entity-type" v-model="net.DESTDE1" readonly>
          </div>
          <div class="form-group row col-lg-3">
            <label class="col-auto font-weight-bold col-form-label col-form-label-sm" for="entity-name">Razón Social: </label>
            <input
              class="col form-control-plaintext form-control-sm"
              type="text"
              name="entity-name"
              :value="'Alignet C.A'"
              id="entity-name"
              readonly
            />
          </div>
          <div class="form-group row col-lg-3">
            <label class="col-auto font-weight-bold col-form-label col-form-label-sm" for="entity-name">Pais: </label>
            <input
              class="col form-control-plaintext form-control-sm"
              type="text"
              name="entity-name"
              :value="'Perú'"
              id="entity-name"
              readonly
            />
          </div>
          <div class="form-group row col-lg-3">
            <label class="col-auto font-weight-bold col-form-label col-form-label-sm" for="entity-name">Categoría: </label>
            <input
              class="col form-control-plaintext form-control-sm"
              type="text"
              name="entity-name"
              :value="'Propio'"
              id="entity-name"
              readonly
            />
          </div>
          <div class="form-group row col-lg-3">
            <label class="col-auto font-weight-bold col-form-label col-form-label-sm" for="entity-name">Nombre Comercial: </label>
            <input
              class="col form-control-plaintext form-control-sm"
              type="text"
              name="entity-name"
              :value="'Servicios Alignet'"
              id="entity-name"
              readonly
            />
          </div>
          <div class="col-12">
            <div class="mdc-chip" role="row">
              <span class="material-icons mr-1">
                badge
              </span>
              <div class="mdc-chip__ripple"></div>
              <span role="gridcell">
                <span role="button" tabindex="-3" class="mdc-chip__primary-action">
                  <span class="mdc-chip__text">Documento: <b>RUC - 20553856451</b></span>
                </span>
              </span>
            </div>
            <div class="mdc-chip" role="row">
              <span class="material-icons mr-1">
                place
              </span>
              <div class="mdc-chip__ripple"></div>
              <span role="gridcell">
                <span role="button" tabindex="-3" class="mdc-chip__primary-action">
                  <span class="mdc-chip__text">Ubicación: <a href="https://maps.google.com/maps?q=Casimiro Ulloa 333, Lima 15047, Perú" target="_blank"><b>Casimiro Ulloa 333, Lima 15047, Perú</b></a></span>
                </span>
              </span>
            </div>
            <div class="mdc-chip" role="row">
              <span class="material-icons mr-1">
                business
              </span>
              <div class="mdc-chip__ripple"></div>
              <span role="gridcell">
                <span role="button" tabindex="-3" class="mdc-chip__primary-action">
                  <span class="mdc-chip__text">Tamaño: <b>Large</b></span>
                </span>
              </span>
            </div>
            <div class="mdc-chip" role="row">
              <span class="material-icons mr-1">
                segment
              </span>
              <div class="mdc-chip__ripple"></div>
              <span role="gridcell">
                <span role="button" tabindex="-3" class="mdc-chip__primary-action">
                  <span class="mdc-chip__text">Segmento: <b>Servicios Financieros</b></span>
                </span>
              </span>
            </div>
          </div>
          <div class="col-12 mt-1">
            <div class="mdc-chip" role="row">
              <span class="material-icons mr-1">
                person
              </span>
              <div class="mdc-chip__ripple"></div>
              <span role="gridcell">
                <span role="button" tabindex="-3" class="mdc-chip__primary-action">
                  <span class="mdc-chip__text">Contacto: <b>Giuliana Torres</b></span>
                </span>
              </span>
            </div>
            <div class="mdc-chip" role="row">
              <span class="material-icons mr-1">
                phone
              </span>
              <div class="mdc-chip__ripple"></div>
              <span role="gridcell">
                <span role="button" tabindex="-3" class="mdc-chip__primary-action">
                  <span class="mdc-chip__text">Teléfono: <a href="skype:+51936703836?call"><b>+51 936 703 836</b></a></span>
                </span>
              </span>
            </div>
            <div class="mdc-chip" role="row">
              <span class="material-icons mr-1">
                email
              </span>
              <div class="mdc-chip__ripple"></div>
              <span role="gridcell">
                <span role="button" tabindex="-3" class="mdc-chip__primary-action">
                  <span class="mdc-chip__text">Correo: <a href="mailto:gtorres@alignet.pe"><b>gtorres@alignet.pe</b></a></span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </form>

      <form class="subform">
        <h4 class="section-header d-flex align-items-center"><span class="material-icons mr-2" style="font-size:2rem">settings</span><span>Servicios</span></h4>
        <data-table :title="' '" :headers='headersServices' :body="dataTableServices" :id="'data-table-services'" :sorted="true"></data-table>
      </form>
      <form class="subform">
        <h4 class="section-header d-flex align-items-center"><span class="material-icons mr-2" style="font-size:2rem">account_balance</span><span>Cuentas bancarias</span></h4>
        <data-table :title="' '" :headers='headersBankAccounts' :body="dataTableBankAccounts" :id="'data-table-services'" :sorted="true"></data-table>
      </form>
      <form class="subform">
        <h4 class="section-header d-flex align-items-center">
          <span class="material-icons mr-2" style="font-size:2rem">price_change</span>
          <span>Comisiones</span>
        </h4>
        <data-table :title="' '" :headers='headersCommisions' :body="dataTableCommisions" :id="'data-table-services'" :sorted="true"></data-table>
      </form>
<!-- 
      <form class="subform">      
        <h4 class="section-header">Representante</h4>
        <div class="form-row">
          <div class="form-group row col-md-4">
            <label for="entity-code">Persona de Contacto</label>
            <input class="form-control form-control-plaintext form-control-sm" type="text" name="entity-code" id="entity-code" required>
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group row col-md-4">
            <label for="entity-code">Cargo</label>
            <input class="form-control form-control-plaintext form-control-sm" type="text" name="entity-code" id="entity-code" required>
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group row col-md-2">
            <label for="entity-code">Teléfono</label>
            <input class="form-control form-control-plaintext form-control-sm" type="text" name="entity-code" id="entity-code" required>
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group row col-md-2">
            <label for="entity-code">Email</label>
            <input class="form-control form-control-plaintext form-control-sm" type="text" name="entity-code" id="entity-code" required>
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
        </div>
      </form>
      <form class="subform">      
        <h4 class="section-header">Ubicación</h4>
        <div class="form-row">
          <div class="form-group row col-md-2">
            <label for="entity-code">Departamento Fiscal</label>
            <input class="form-control form-control-plaintext form-control-sm" type="text" name="entity-code" id="entity-code" required>
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group row col-md-2">
            <label for="entity-code">Provincia Fiscal</label>
            <input class="form-control form-control-plaintext form-control-sm" type="text" name="entity-code" id="entity-code" required>
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group row col-lg-2">
            <label for="entity-country">Típo de Vía Fiscal</label>
            <select
              class="form-control form-control-plaintext form-control-sm"
              name="entity-country"
              id="entity-country"
            >
              <option value=""></option>
              <option value="1">Categoria 1</option>
              <option value="2">Categoria 2</option>
              <option value="3">Categoria 3</option>
            </select>
        </div>
          <div class="form-group row col-md-4">
            <label for="entity-code">Dirección Fiscal</label>
            <input class="form-control form-control-plaintext form-control-sm" type="text" name="entity-code" id="entity-code" required>
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
          <div class="form-group row col-md-2">
            <label for="entity-code">Distrito Fiscal</label>
            <input class="form-control form-control-plaintext form-control-sm" type="text" name="entity-code" id="entity-code" required>
            <div class="invalid-feedback">
              Este campo es obligatorio
            </div>
          </div>
        </div>
      </form> -->
      <div class="form-actions-container">
        <hr />
        <button class="btn btn-primary" @click="$router.go(-1)">Atras</button>
      </div>
    </div>
  </div>
  <div>
    <form-navigator :actions="actions" :alert="'No sé ha culminado la configuración de esta entidad, por lo que no puede ser liquidada'" :title="'Entidad ' + ' ' + net.LCMCOD + ': '  + net.LCMDES " :formGroup="formGroup" :forms="forms"></form-navigator>
  </div>
</div>
`
})