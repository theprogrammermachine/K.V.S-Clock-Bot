
let timeSecMirror = {
  elId: 'secondHand',
  property: 'transform',
  value: 'rotate(calc(((@timeSec + 1) * 6deg) - 90deg))',
  variable: { id: 'timeSec', from: 'time.now.seconds' },
};
let timeMinMirror = {
  elId: 'minuteHand',
  property: 'transform',
  value: 'rotate(calc((@timeMin * 6deg) - 90deg))',
  variable: { id: 'timeMin', from: 'time.now.minutes' },
};
let timeHourMirror = {
  elId: 'hourHand',
  property: 'transform',
  value: 'rotate(calc((@timeHour * 30deg) + 18deg - 90deg))',
  variable: { id: 'timeHour', from: 'time.now.hours' },
};
let clockTypeMemory = {
  memoryId: 'clockType',
  value: 'clock'
};
let onClockBoxClick = {
  elId: 'clockBox',
  codes: [
    {
      type: 'conditionList',
      conditions: [
        {
          item1: {
            type: 'memory',
            memoryId: 'clockType'
          },
          item2: {
            type: 'constant',
            constant: 'clock'
          },
          type: 'e',
          then: [
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'clockBox',
              property: 'transform',
              newValue: 'rotateY(-360deg)'
            },
            {
              type: 'straight',
              updateType: 'memory',
              memoryId: 'clockType',
              value: 'weather'
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'clockBackImage',
              property: 'display',
              newValue: 'none',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'clockBackShadow',
              property: 'display',
              newValue: 'none',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'secondHand',
              property: 'display',
              newValue: 'none',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'minuteHand',
              property: 'display',
              newValue: 'none',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'hourHand',
              property: 'display',
              newValue: 'none',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'clockMsg',
              property: 'display',
              newValue: 'block',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'weather',
              property: 'display',
              newValue: 'block',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'weatherMsg',
              property: 'display',
              newValue: 'block',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'humidity',
              property: 'display',
              newValue: 'block',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'weatherHumidity',
              property: 'display',
              newValue: 'block',
              delay: 240
            }
          ]
        },
        {
          item1: {
            type: 'memory',
            memoryId: 'clockType'
          },
          item2: {
            type: 'constant',
            constant: 'weather'
          },
          type: 'e',
          then: [
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'clockBox',
              property: 'transform',
              newValue: 'rotateY(0deg)'
            },
            {
              type: 'straight',
              updateType: 'memory',
              memoryId: 'clockType',
              value: 'clock'
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'clockBackImage',
              property: 'display',
              newValue: 'block',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'clockBackShadow',
              property: 'display',
              newValue: 'block',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'secondHand',
              property: 'display',
              newValue: 'block',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'minuteHand',
              property: 'display',
              newValue: 'block',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'hourHand',
              property: 'display',
              newValue: 'block',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'clockMsg',
              property: 'display',
              newValue: 'none',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'weather',
              property: 'display',
              newValue: 'none',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'weatherMsg',
              property: 'display',
              newValue: 'none',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'humidity',
              property: 'display',
              newValue: 'none',
              delay: 240
            },
            {
              type: 'straight',
              updateType: 'gui',
              elId: 'weatherHumidity',
              property: 'display',
              newValue: 'none',
              delay: 240
            }
          ]
        },
      ]
    }
  ]
};
let weatherTempUpdate = {
  elId: 'weatherMsg',
  property: 'styledContent',
  newValue: '-',
};
let weatherHumidityUpdate = {
  elId: 'weatherHumidity',
  property: 'styledContent',
  newValue: '-',
};

let clockWidgetInitGui = {
    type: 'Box',
    id: 'clockBox',
    width: '100%',
    height: '100%',
    transition: 'transform 1s',
    position: 'relative',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 1)',
    children: [
      {
        type: 'Image',
        id: 'clockBackImage',
        width: '100%',
        height: '100%',
        borderRadius: 1000,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1,
        src:
          'https://i.pinimg.com/originals/eb/ad/bc/ebadbc481c675e0f2dea0cc665f72497.jpg',
      },
      {
        type: 'Box',
        id: 'clockBackShadow',
        width: '100%',
        height: '100%',
        borderRadius: 1000,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 2,
        background: 'rgba(255, 255, 255, 0.5)',
      },
      {
        type: 'Text',
        id: 'clockMsg',
        width: '100%',
        height: 'auto',
        position: 'absolute',
        alignChildren: 'center',
        top: 40,
        zIndex: 3,
        text: 'سلام کیهان',
        display: 'none',
        color: '#333',
        fontSize: 27
      },
      {
        type: 'Image',
        id: 'weather',
        width: '30%',
        height: '30%',
        top: '30%',
        left: '7.5%',
        position: 'absolute',
        alignChildren: 'center',
        borderRadius: '50%',
        zIndex: 3,
        src: 'https://i.ibb.co/QJvgMHs/cloudy.png',
        display: 'none',
      },
      {
        type: 'Text',
        id: 'weatherMsg',
        width: '100%',
        height: 'auto',
        position: 'absolute',
        alignChildren: 'right',
        alignText: 'right',
        justifyContent: 'right',
        top: 112,
        right: 32,
        fontSize: 22,
        zIndex: 3,
        display: 'none',
        color: '#333'
      },
      {
        type: 'Image',
        id: 'humidity',
        width: '20%',
        height: '20%',
        top: 112 + 84,
        left: '20%',
        position: 'absolute',
        alignChildren: 'center',
        borderRadius: '50%',
        zIndex: 3,
        src: 'https://i.ibb.co/G7kCTpj/humidity.png',
        display: 'none',
      },
      {
        type: 'Text',
        id: 'weatherHumidity',
        width: '100%',
        height: 'auto',
        position: 'absolute',
        alignChildren: 'right',
        alignText: 'right',
        justifyContent: 'right',
        top: 112 + 84,
        right: 72,
        zIndex: 3,
        display: 'none',
        color: '#333',
        fontSize: 27
      },
      {
        type: 'Box',
        id: 'secondHand',
        width: '100%',
        height: 25,
        position: 'absolute',
        left: 0,
        top: 'calc(50% - 12.5px)',
        transform: 'rotate(75deg)',
        transition: 'transform 1s',
        zIndex: 3,
        children: [
          {
            type: 'Box',
            id: 'secondImage',
            width: '50%',
            height: '100%',
            position: 'absolute',
            left: '50%',
            background: 'rgba(0, 0, 0, 0.75)',
            borderRadius: '50%'
          },
        ],
      },
      {
        type: 'Box',
        id: 'minuteHand',
        width: '100%',
        height: 25,
        position: 'absolute',
        left: 0,
        top: 'calc(50% - 12.5px)',
        transform: 'rotate(-135deg)',
        transition: 'transform 1s',
        zIndex: 3,
        children: [
          {
            type: 'Box',
            id: 'minuteImage',
            width: '40%',
            height: '100%',
            position: 'absolute',
            left: '50%',
            background: 'rgba(0, 0, 0, 0.75)',
            borderRadius: '50%'
          },
        ],
      },
      {
        type: 'Box',
        id: 'hourHand',
        width: '100%',
        height: 25,
        position: 'absolute',
        left: 0,
        top: 'calc(50% - 12.5px)',
        transform: 'rotate(295deg)',
        transition: 'transform 1s',
        zIndex: 3,
        children: [
          {
            type: 'Box',
            id: 'hourImage',
            width: '30%',
            height: '100%',
            position: 'absolute',
            left: '50%',
            background: 'rgba(0, 0, 0, 0.75)',
            borderRadius: '50%'
          },
        ],
      },
    ],
};

module.exports = {
  weatherHumidityUpdate: weatherHumidityUpdate,
  weatherTempUpdate: weatherTempUpdate,
  clockTypeMemory: clockTypeMemory,
  onClockBoxClick: onClockBoxClick,
  timeHourMirror: timeHourMirror,
  timeMinMirror: timeMinMirror,
  timeSecMirror: timeSecMirror,
  clockWidgetInitGui: clockWidgetInitGui
};
