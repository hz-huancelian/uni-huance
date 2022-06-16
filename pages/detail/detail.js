const detail = {
    "success": true,
    "message": "success",
    "code": 200,
    "timestamp": 1648632035965,
    "result": {
        "sampItemId": "37",
        "sampleNo": "0002220330Q001",
        "sampleStatus": "0",
        "factorPoint": null,
        "secdClassId": "0020021",
        "secdClassName": "饮食业油烟",
        "factorName": "PM2.5",
        "collectLeaderId": null,
        "collectLeader": null,
        "auditReason": null,
        "sampleJobVo": {
            "projectName": "内部测试2",
            "consignorName": "PC-1",
            "inspectionName": "光大",
            "inspectionLinker": "老李",
            "inspectionLinkerPhone": "18273829101",
            "taskAddress": "老街112号",
            "startDate": "2022-03-29",
            "endDate": "2022-03-31",
            "jobRemark": "内部测试2-第一个任务"
        },
        "sampleDataVo": {
            "imageList": null,
            "collectUserId": null,
            "collectUser": null,
            "collectDate": null,
            "collectLocation": null,
            "sampleData": [
                {
                    "groupKey": "1",
                    "groupName": null,
                    "params": [
                        {
                            "key": "tiemInterval",
                            "name": "采样时段",
                            "required": true,
                            "numericType": "1",
                            "labelType": "6",
                            "showType": 1
                        },
						{
						    "key": "tiemDate",
						    "name": "采样日期",
						    "required": true,
						    "numericType": "1",
						    "labelType": "4",
						    "showType": 1
						},
						{
						    "key": "tiemTime",
						    "name": "采样时间",
						    "required": true,
						    "numericType": "1",
						    "labelType": "5",
						    "showType": 1
						},
						{
						    "key": "tiemApprover",
						    "name": "采样复核人",
						    "required": true,
						    "numericType": "1",
						    "labelType": "7",
						    "showType": 1,
							"radioValue": "沈浪,赵明,采样员A,采样员B,采样员C"
						},
                    ]
                },
                {
                    "groupKey": "2",
                    "groupName": "天气",
                    "params": [
                        {
                            "key": "weatherCondition",
                            "name": "天气状态",
                            "required": false,
                            "numericType": "1",
                            "labelType": "2",
                            "showType": 1,
                            "radioValue": "晴,阴,雨,雪,风"
                        }
                    ]
                },
                {
                    "groupKey": "3",
                    "groupName": null,
                    "params": [
                        {
                            "key": "sampleFluid",
                            "name": "采样流体(L/min)",
                            "required": false,
                            "numericType": "0",
                            "labelType": "1",
                            "showType": 1
                        }
                    ]
                },
                {
                    "groupKey": "4",
                    "groupName": "体积",
                    "params": [
                        {
                            "key": "sampleVolume",
                            "name": "采样体积",
                            "required": false,
                            "numericType": "0",
                            "labelType": "1",
                            "showType": 1
                        },
                        {
                            "key": "batterFluid",
                            "name": "参比体积",
                            "required": false,
                            "numericType": "0",
                            "labelType": "1",
                            "showType": 1
                        },
                        {
                            "key": "standardStateVolume",
                            "name": "标态体积",
                            "required": false,
                            "numericType": "0",
                            "labelType": "1",
                            "showType": 1
                        }
                    ]
                },
                {
                    "groupKey": "5",
                    "groupName": "物理",
                    "params": [
                        {
                            "key": "temperature",
                            "name": "气温",
                            "required": false,
                            "numericType": "0",
                            "labelType": "1",
                            "showType": 1
                        },
                        {
                            "key": "kpa",
                            "name": "大气压(KPa)",
                            "required": false,
                            "numericType": "0",
                            "labelType": "1",
                            "showType": 1
                        },
                        {
                            "key": "humidity",
                            "name": "相对湿度(%)",
                            "required": false,
                            "numericType": "0",
                            "labelType": "1",
                            "showType": 1
                        },
                        {
                            "key": "dominant",
                            "name": "主导风向(%)",
                            "required": false,
                            "numericType": "0",
                            "labelType": "1",
                            "showType": 1
                        },
                        {
                            "key": "windSpeed",
                            "name": "风速(m/s)",
                            "required": false,
                            "numericType": "0",
                            "labelType": "1",
                            "showType": 1
                        }
                    ]
                },
                {
                    "groupKey": "6",
                    "groupName": "校准",
                    "params": [
                        {
                            "key": "mediumFlow",
                            "name": "中流量校准仪器",
                            "required": true,
                            "numericType": "0",
                            "labelType": "0",
                            "showType": 1,
                            "selectValue": [
                                {
                                    "name": "土壤采样设备A",
                                    "children": [
                                        {
                                            "name": "1888",
                                            "children": [
                                                {
                                                    "id": "29",
                                                    "equipmentNumber": "TK-010-0100-11-4",
                                                    "equipmentName": "土壤采样设备A",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "3M",
                                                    "equipmentModel": "1888"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "大气引爆机",
                                    "children": [
                                        {
                                            "name": "tesila-101",
                                            "children": [
                                                {
                                                    "id": "257",
                                                    "equipmentNumber": "tk-gas-001",
                                                    "equipmentName": "大气引爆机1",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "特斯拉",
                                                    "equipmentModel": "tesila-101"
                                                },
                                                {
                                                    "id": "258",
                                                    "equipmentNumber": "tk-gas-0010",
                                                    "equipmentName": "大气引爆机2",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "特斯拉斯特",
                                                    "equipmentModel": "tesila-101"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "测试设备3",
                                    "children": [
                                        {
                                            "name": "9898",
                                            "children": [
                                                {
                                                    "id": "262",
                                                    "equipmentNumber": "tk-gas-000",
                                                    "equipmentName": "测试设备3",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "3m",
                                                    "equipmentModel": "9898"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "气体采样设备A",
                                    "children": [
                                        {
                                            "name": "1866",
                                            "children": [
                                                {
                                                    "id": "26",
                                                    "equipmentNumber": "TK-010-011-1-1",
                                                    "equipmentName": "气体采样设备A",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "3M",
                                                    "equipmentModel": "1866"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "水采样设备A",
                                    "children": [
                                        {
                                            "name": "1865",
                                            "children": [
                                                {
                                                    "id": "25",
                                                    "equipmentNumber": "10-0100-11-1",
                                                    "equipmentName": "水采样设备A",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "3M",
                                                    "equipmentModel": "1865"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "测试设备",
                                    "children": [
                                        {
                                            "name": "8888",
                                            "children": [
                                                {
                                                    "id": "261",
                                                    "equipmentNumber": "TK-010-0100-11-4",
                                                    "equipmentName": "测试设备",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "3M",
                                                    "equipmentModel": "8888"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "大气采样仪",
                                    "children": [
                                        {
                                            "name": "2071",
                                            "children": [
                                                {
                                                    "id": "556",
                                                    "equipmentNumber": "M1002",
                                                    "equipmentName": "大气采样仪1",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "青岛崂应",
                                                    "equipmentModel": "2071"
                                                },
                                                {
                                                    "id": "561",
                                                    "equipmentNumber": "M1002",
                                                    "equipmentName": "大气采样仪2",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "青岛崂应",
                                                    "equipmentModel": "2071"
                                                },
                                                {
                                                    "id": "562",
                                                    "equipmentNumber": "M1003",
                                                    "equipmentName": "大气采样仪3",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "青岛崂应",
                                                    "equipmentModel": "2071"
                                                },
                                                {
                                                    "id": "567",
                                                    "equipmentNumber": "M1002",
                                                    "equipmentName": "大气采样仪4",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "青岛崂应",
                                                    "equipmentModel": "2071"
                                                },
                                                {
                                                    "id": "568",
                                                    "equipmentNumber": "M1003",
                                                    "equipmentName": "大气采样仪5",
                                                    "equipmentFirstTypeVal": null,
                                                    "equipmentSecondTypeVal": null,
                                                    "equipmentBrand": "青岛崂应",
                                                    "equipmentModel": "2071"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "key": "mediumCalibrationDate",
                            "name": "校准日期",
                            "required": true,
                            "numericType": "1",
                            "labelType": "4",
                            "showType": 1
                        },
                        {
                            "key": "mediumCalibratioVal",
                            "name": "校准值（L/min）",
                            "required": true,
                            "numericType": "1",
                            "labelType": "1",
                            "showType": 1
                        }
                    ]
                },
                {
                    "groupKey": "7",
                    "groupName": "监测",
                    "params": [
                        {
                            "key": "mediumBeforeMonitoring",
                            "name": "监测前（L/min）",
                            "required": true,
                            "numericType": "0",
                            "labelType": "1",
                            "showType": 1
                        },
                        {
                            "key": "mediumAfterMonitoring",
                            "name": "监测后（L/min）",
                            "required": true,
                            "numericType": "0",
                            "labelType": "1",
                            "showType": 1
                        }
                    ]
                },
				{
				    "groupKey": "1",
				    "groupName": null,
				    "params": [
				        {
				            "key": "measured",
				            "name": "测定值",
				            "required": true,
				            "numericType": "1",
				            "labelType": "8",
				            "showType": 1
				        }
				    ]
				},
				{
				    "groupKey": "1",
				    "groupName": null,
				    "params": [
				        {
				            "key": "specialRemark",
				            "name": "特别说明",
				            "required": true,
				            "numericType": "1",
				            "labelType": "9",
				            "showType": 1
				        }
				    ]
				},
            ],
            "collectRemark": null
        },
        "factorDataVos": [
            {
                "id": "45",
                "factorName": "PM2.5",
                "factorData": null,
                "checkEquipment": null,
                "calibrationEquipment": null
            }
        ],
        "sampleAuditVo": null
    }
};
export default detail;