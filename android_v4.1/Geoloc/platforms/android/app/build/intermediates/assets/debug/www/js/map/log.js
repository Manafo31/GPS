var userLog = {
    myIdMysql: "",
    pseudo: "",
    avatar: ""
}
var monJson = undefined;
var rdvCible={

}

var connectionApproved = false;

var server = {
    gps: {
        url: "http://nodejs2.afpa-balma.fr/gps/select/all/last",
        pseudo: "http://nodejs2.afpa-balma.fr/gps/select/pseudo/",
        urlCreate: "http://nodejs2.afpa-balma.fr/gps/create"
        /* url:"http://10.114.129.119:3000/gps/select/all",
        urlCreate:"http://10.114.129.119:3000/gps/create" */
    },
    rdv: {
        url: "http://nodejs2.afpa-balma.fr/rdv/select/all",
        urlSelectCle:"http://nodejs2.afpa-balma.fr/rdv/select/cle/",
        urlCreate: "http://nodejs2.afpa-balma.fr/rdv/create"
        /*url:"http://10.114.129.119:3000/rdv/select/all",
        urlCreate:"http://10.114.129.119:3000/rdv/create" */
    },
}

var testGpsINSERT = [{
        "MysqlId": "01",
        "pseudo": "Xavier",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.33245",
            "latitude": "43.54616"
        }
    },
    {
        "MysqlId": "02",
        "pseudo": "munick",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.45245",
            "latitude": "43.78616"
        }
    },
    {
        "MysqlId": "03",
        "pseudo": "solene",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.42245",
            "latitude": "43.68616"
        }
    },
    {
        "MysqlId": "04",
        "pseudo": "Carl",
        "avatar": "http://avatar.fr/02.jpg",
        "coordinates": {
            "longitude": "1.53651",
            "latitude": "43.56222"
        }
    },
    {
        "MysqlId": "06",
        "pseudo": "Thomas",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.45245",
            "latitude": "43.58616"
        }
    },
    {
        "MysqlId": "07",
        "pseudo": "Thierry",
        "avatar": "http://avatar.fr/05.jpg",
        "coordinates": {
            "longitude": "1.54245",
            "latitude": "43.65616"
        }
    },
    {
        "MysqlId": "08",
        "pseudo": "Betty",
        "avatar": "http://avatar.fr/08.jpg",
        "coordinates": {
            "longitude": "1.38245",
            "latitude": "43.62616"
        }
    },
    {
        "MysqlId": "09",
        "pseudo": "Zakia",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.35245",
            "latitude": "43.60616"
        }
    },
    {
        "MysqlId": "10",
        "pseudo": "babacar",
        "avatar": "http://avatar.fr/11.jpg",
        "coordinates": {
            "longitude": "1.45245",
            "latitude": "43.68616"
        }
    },
    {
        "MysqlId": "11",
        "pseudo": "MathieuG",
        "avatar": "http://avatar.fr/05.jpg",
        "coordinates": {
            "longitude": "1.38245",
            "latitude": "43.65616"
        }
    },
    {
        "MysqlId": "12",
        "pseudo": "MathieuP",
        "avatar": "http://avatar.fr/12.jpg",
        "coordinates": {
            "longitude": "1.36245",
            "latitude": "43.55616"
        }
    },
    {
        "MysqlId": "13",
        "pseudo": "BenjaminR",
        "avatar": "http://avatar.fr/22.jpg",
        "coordinates": {
            "longitude": "1.43245",
            "latitude": "43.64616"
        }
    },
    {
        "MysqlId": "14",
        "pseudo": "BenjaminB",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.45245",
            "latitude": "43.62616"
        }
    },
    {
        "MysqlId": "15",
        "pseudo": "Maxime",
        "avatar": "http://avatar.fr/08.jpg",
        "coordinates": {
            "longitude": "1.56245",
            "latitude": "43.57616"
        }
    },
    {
        "MysqlId": "16",
        "pseudo": "Jade",
        "avatar": "http://avatar.fr/09.jpg",
        "coordinates": {
            "longitude": "1.58245",
            "latitude": "43.58616"
        }
    },
    {
        "MysqlId": "17",
        "pseudo": "Thibault",
        "avatar": "http://avatar.fr/05.jpg",
        "coordinates": {
            "longitude": "1.53245",
            "latitude": "43.65616"
        }
    },
    {
        "MysqlId": "01",
        "pseudo": "Xavier",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.39245",
            "latitude": "43.51616"
        }
    },
    {
        "MysqlId": "02",
        "pseudo": "munick",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.34245",
            "latitude": "43.54616"
        }
    },
    {
        "MysqlId": "03",
        "pseudo": "solene",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.22245",
            "latitude": "43.65616"
        }
    },
    {
        "MysqlId": "04",
        "pseudo": "Carl",
        "avatar": "http://avatar.fr/02.jpg",
        "coordinates": {
            "longitude": "1.53651",
            "latitude": "43.56522"
        }
    },
    {
        "MysqlId": "06",
        "pseudo": "Thomas",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.48245",
            "latitude": "43.51616"
        }
    },
    {
        "MysqlId": "07",
        "pseudo": "Thierry",
        "avatar": "http://avatar.fr/05.jpg",
        "coordinates": {
            "longitude": "1.52245",
            "latitude": "43.61616"
        }
    },
    {
        "MysqlId": "08",
        "pseudo": "Betty",
        "avatar": "http://avatar.fr/08.jpg",
        "coordinates": {
            "longitude": "1.35245",
            "latitude": "43.65616"
        }
    },
    {
        "MysqlId": "09",
        "pseudo": "Zakia",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.35245",
            "latitude": "43.61616"
        }
    },
    {
        "MysqlId": "10",
        "pseudo": "babacar",
        "avatar": "http://avatar.fr/11.jpg",
        "coordinates": {
            "longitude": "1.47245",
            "latitude": "43.65616"
        }
    },
    {
        "MysqlId": "11",
        "pseudo": "MathieuG",
        "avatar": "http://avatar.fr/05.jpg",
        "coordinates": {
            "longitude": "1.35245",
            "latitude": "43.61616"
        }
    },
    {
        "MysqlId": "12",
        "pseudo": "MathieuP",
        "avatar": "http://avatar.fr/12.jpg",
        "coordinates": {
            "longitude": "1.34245",
            "latitude": "43.54616"
        }
    },
    {
        "MysqlId": "13",
        "pseudo": "BenjaminR",
        "avatar": "http://avatar.fr/22.jpg",
        "coordinates": {
            "longitude": "1.40245",
            "latitude": "43.62616"
        }
    },
    {
        "MysqlId": "14",
        "pseudo": "BenjaminB",
        "avatar": "http://avatar.fr/03.jpg",
        "coordinates": {
            "longitude": "1.47245",
            "latitude": "43.61616"
        }
    },
    {
        "MysqlId": "15",
        "pseudo": "Maxime",
        "avatar": "http://avatar.fr/08.jpg",
        "coordinates": {
            "longitude": "1.58245",
            "latitude": "43.53616"
        }
    },
    {
        "MysqlId": "16",
        "pseudo": "Jade",
        "avatar": "http://avatar.fr/09.jpg",
        "coordinates": {
            "longitude": "1.52245",
            "latitude": "43.51616"
        }
    },
    {
        "MysqlId": "17",
        "pseudo": "Thibault",
        "avatar": "http://avatar.fr/05.jpg",
        "coordinates": {
            "longitude": "1.51245",
            "latitude": "43.64616"
        }
    },
]
var testRdvINSERT = [{
        "cle": "concertRockBikini",
        "titre": "Concert Rock bikini",
        "type": "concert",
        "createur": "zakia",
        "dateDebut": "2018-10-20h10",
        "dateFin": "2018-10-23h10",
        "description": "Concert au bikini, venez nombreux . ",
        "participant": {
            "pseudo": ["Xavier", "Zakia", "Maxime"]
        },
        "coordinates": {
            "longitude": 1.435751515,
            "latitude": 43.615615
        },
        "avatar": "http://avatar.com/event/22.jpg"
    },
    {
        "cle": "RendezvousAfpa",
        "titre": "Rendez vous Afpa",
        "type": "reunion",
        "createur": "maxime",
        "dateDebut": "2018-12-10h10",
        "dateFin": "2018-12-12h10",
        "description": "Réunion afpa balma pour le projet",
        "participant": {
            "pseudo": ["Xavier", "Zakia", "Maxime", "BenjaminR", "BenjaminB", "Thomas", "Babacar", "Thibault", "MathieuG", "MathieuP", "Carl", "Thierry", "Solene", "Aurore", "Jade", "Munick"]
        },
        "coordinates": {
            "longitude": 4.445751515,
            "latitude": 43.5851785855615
        },
        "avatar": "http://avatar.com/event/08.jpg"
    },
    {
        "cle": "ManifestionCapitol",
        "titre": "Manifestation Capitol",
        "type": "manifestation",
        "createur": "thibault",

        "dateDebut": "2018-15-08h10",
        "dateFin": "2018-15-12h10",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt, erat vitae ornare malesuada, ex est tempor felis, at imperdiet neque libero non urna. Praesent tincidunt odio nec libero blandit mattis. Sed et lobortis lorem, ut ultricies nulla. Donec vel quam ac ipsum luctus varius in a justo. Vestibulum ipsum velit, pellentesque eu dictum eleifend, iaculis et lectus. Vivamus lacinia placerat dolor, vel tincidunt urna. Nam tempor felis ipsum, vel lacinia leo feugiat sit amet. Duis eget ligula nibh. ",
        "participant": {
            "pseudo": ["Thibault", "Betty", "Maxime", "Munick", "Jade", "Babacar"]
        },
        "coordinates": {
            "longitude": 1.415751515,
            "latitude": 43.5851785855615
        },
        "avatar": "http://avatar.com/event/02.jpg"
    },
    {
        "cle": "greveCgt",
        "titre": "greve Cgt",
        "type": "greve",
        "createur": "aurore",

        "dateDebut": "2018-10-08h10",
        "dateFin": "2018-10-23h10",
        "description": "Greve pour les conditions des développeurs en entreprise !! ",
        "participant": {
            "pseudo": ["Xavier", "Zakia", "Maxime"]
        },
        "coordinates": {
            "longitude": 1.4157,
            "latitude": 43.5121
        },
        "avatar": "http://avatar.com/event/02.jpg"
    }
]