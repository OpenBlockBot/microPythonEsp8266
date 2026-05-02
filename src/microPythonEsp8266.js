const { formatMessage, ArgumentType, BlockType, ProgramModeType, CommonPeripheral } = window.Scratch;

const PNPID_LIST = [
    // CH340
    'USB\\VID_1A86&PID_7523',
    // CP2102
    'USB\\VID_10C4&PID_EA60',
    // FTDI
    'USB\\VID_0403&PID_6001'
];

const SERIAL_CONFIG = {
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    dtr: false,
    rts: false
};

const DIVECE_OPT = {
    type: 'microPython',
    chip: 'esp8266',
    baud: {
        darwin: '460800',
        linux: '460800',
        win32: '921600'
    },
    firmware: 'microPython-esp8266.bin',
    dtr: false,
    rts: false
};

const Pins = {
    GPIO0: '0',
    GPIO1: '1',
    GPIO2: '2',
    GPIO3: '3',
    GPIO4: '4',
    GPIO5: '5',
    GPIO6: '6',
    GPIO7: '7',
    GPIO8: '8',
    GPIO9: '9',
    GPIO10: '10',
    GPIO11: '11',
    GPIO12: '12',
    GPIO13: '13',
    GPIO14: '14',
    GPIO15: '15',
    GPIO16: '16',
    A0: 'A0'
};

const Level = {
    High: '1',
    Low: '0'
};

const Eol = {
    Warp: 'warp',
    NoWarp: 'noWarp'
};

const Mode = {
    Input: 'IN',
    Output: 'OUT',
    InputPullup: 'PULL_UP'
};

const InterrupMode = {
    Rising: 'RISING',
    Falling: 'FALLING',
    Change: 'CHANGE'
};

class MicroPythonEsp8266 extends CommonPeripheral {
    constructor (runtime, deviceId) {
        super(runtime, deviceId, PNPID_LIST, SERIAL_CONFIG, DIVECE_OPT);
    }
}

class OpenBlockMicroPythonEsp8266Device {
    get DEVICE_ID () {
        return 'microPythonEsp8266';
    }

    get PINS_MENU () {
        return [
            { text: 'GPIO0', value: Pins.GPIO0 },
            { text: 'GPIO1', value: Pins.GPIO1 },
            { text: 'GPIO2', value: Pins.GPIO2 },
            { text: 'GPIO3', value: Pins.GPIO3 },
            { text: 'GPIO4', value: Pins.GPIO4 },
            { text: 'GPIO5', value: Pins.GPIO5 },
            { text: 'GPIO12', value: Pins.GPIO12 },
            { text: 'GPIO13', value: Pins.GPIO13 },
            { text: 'GPIO14', value: Pins.GPIO14 },
            { text: 'GPIO15', value: Pins.GPIO15 },
            { text: 'GPIO16', value: Pins.GPIO16 },
            { text: 'A0', value: Pins.A0 }
        ];
    }

    get MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonEsp8266.modeMenu.input',
                    default: 'input',
                    description: 'label for input pin mode'
                }),
                value: Mode.Input
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp8266.modeMenu.output',
                    default: 'output',
                    description: 'label for output pin mode'
                }),
                value: Mode.Output
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp8266.modeMenu.inputPullup',
                    default: 'input-pullup',
                    description: 'label for input-pullup pin mode'
                }),
                value: Mode.InputPullup
            }
        ];
    }

    get DIGITAL_PINS_MENU () {
        return [
            { text: 'GPIO0', value: Pins.GPIO0 },
            { text: 'GPIO1', value: Pins.GPIO1 },
            { text: 'GPIO2', value: Pins.GPIO2 },
            { text: 'GPIO3', value: Pins.GPIO3 },
            { text: 'GPIO4', value: Pins.GPIO4 },
            { text: 'GPIO5', value: Pins.GPIO5 },
            { text: 'GPIO12', value: Pins.GPIO12 },
            { text: 'GPIO13', value: Pins.GPIO13 },
            { text: 'GPIO14', value: Pins.GPIO14 },
            { text: 'GPIO15', value: Pins.GPIO15 },
            { text: 'GPIO16', value: Pins.GPIO16 }
        ];
    }

    get DEFAULT_DIGITAL_PIN () {
        return Pins.GPIO4;
    }

    get ANALOG_PINS_MENU () {
        return [
            { text: 'A0', value: Pins.A0 }
        ];
    }

    get DEFAULT_ANALOG_PIN () {
        return Pins.A0;
    }

    get PWM_AND_INTERRUPT_PINS_MENU () {
        return [
            { text: 'GPIO0', value: Pins.GPIO0 },
            { text: 'GPIO1', value: Pins.GPIO1 },
            { text: 'GPIO2', value: Pins.GPIO2 },
            { text: 'GPIO3', value: Pins.GPIO3 },
            { text: 'GPIO4', value: Pins.GPIO4 },
            { text: 'GPIO5', value: Pins.GPIO5 },
            { text: 'GPIO12', value: Pins.GPIO12 },
            { text: 'GPIO13', value: Pins.GPIO13 },
            { text: 'GPIO14', value: Pins.GPIO14 },
            { text: 'GPIO15', value: Pins.GPIO15 }
        ];
    }

    get DEFAULT_PWM_AND_INTERRUPT_PIN () {
        return Pins.GPIO4;
    }

    get LEVEL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonEsp8266.levelMenu.high',
                    default: 'high',
                    description: 'label for high level'
                }),
                value: Level.High
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp8266.levelMenu.low',
                    default: 'low',
                    description: 'label for low level'
                }),
                value: Level.Low
            }
        ];
    }

    get INTERRUP_MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonEsp8266.InterrupModeMenu.risingEdge',
                    default: 'rising edge',
                    description: 'label for rising edge interrup'
                }),
                value: InterrupMode.Rising
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp8266.InterrupModeMenu.fallingEdge',
                    default: 'falling edge',
                    description: 'label for falling edge interrup'
                }),
                value: InterrupMode.Falling
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp8266.InterrupModeMenu.changeEdge',
                    default: 'change edge',
                    description: 'label for change edge interrup'
                }),
                value: InterrupMode.Change
            }
        ];
    }

    get EOL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonEsp8266.eolMenu.warp',
                    default: 'warp',
                    description: 'label for warp print'
                }),
                value: Eol.Warp
            },
            {
                text: formatMessage({
                    id: 'microPythonEsp8266.eolMenu.noWarp',
                    default: 'no-warp',
                    description: 'label for no warp print'
                }),
                value: Eol.NoWarp
            }
        ];
    }

    constructor (runtime) {
        this.runtime = runtime;
        this._peripheral = new MicroPythonEsp8266(this.runtime, this.DEVICE_ID);
    }

    getInfo () {
        return [
            {
                id: 'pin',
                name: formatMessage({
                    id: 'microPythonEsp8266.category.pins',
                    default: 'Pins',
                    description: 'The name of the MicroPython Esp8266 device pin category'
                }),
                color1: '#4C97FF',
                color2: '#3373CC',
                color3: '#3373CC',

                blocks: [
                    {
                        opcode: 'setPinMode',
                        text: formatMessage({
                            id: 'microPythonEsp8266.pins.setPinMode',
                            default: 'set pin [PIN] mode [MODE]',
                            description: 'MicroPython esp8266 set pin mode'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_DIGITAL_PIN
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'mode',
                                defaultValue: Mode.Input
                            }
                        }
                    },
                    {
                        opcode: 'setDigitalOutput',
                        text: formatMessage({
                            id: 'microPythonEsp8266.pins.setDigitalOutput',
                            default: 'set digital pin [PIN] out [LEVEL]',
                            description: 'MicroPython esp8266 set digital pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: this.DEFAULT_DIGITAL_PIN
                            },
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level',
                                defaultValue: Level.High
                            }
                        }
                    },
                    {
                        opcode: 'setPwmOutput',
                        text: formatMessage({
                            id: 'microPythonEsp8266.pins.setPwmOutput',
                            default: 'set pwm pin [PIN] out [OUT]',
                            description: 'MicroPython esp8266 set pwm pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pwmPins',
                                defaultValue: this.DEFAULT_PWM_AND_INTERRUPT_PIN
                            },
                            OUT: {
                                type: ArgumentType.UINT10_NUMBER,
                                defaultValue: '1023'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'readDigitalPin',
                        text: formatMessage({
                            id: 'microPythonEsp8266.pins.readDigitalPin',
                            default: 'read digital pin [PIN]',
                            description: 'MicroPython esp8266 read digital pin'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'digitalPins',
                                defaultValue: this.DEFAULT_DIGITAL_PIN
                            }
                        }
                    },
                    {
                        opcode: 'esp8266ReadAnalogPin',
                        text: formatMessage({
                            id: 'microPythonEsp8266.pins.readAnalogPin',
                            default: 'read analog pin [PIN]',
                            description: 'MicroPython esp8266 read analog pin'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'analogPins',
                                defaultValue: this.DEFAULT_ANALOG_PIN
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'setServoOutput',
                        text: formatMessage({
                            id: 'microPythonEsp8266.pins.setServoOutput',
                            default: 'set servo pin [PIN] out [OUT]',
                            description: 'MicroPython esp8266 set servo pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pwmPins',
                                defaultValue: this.DEFAULT_PWM_AND_INTERRUPT_PIN
                            },
                            OUT: {
                                type: ArgumentType.HALF_ANGLE,
                                defaultValue: '90'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'attachInterrupt',
                        text: formatMessage({
                            id: 'microPythonEsp8266.pins.esp8266AttachInterrupt',
                            default: 'attach interrupt pin [PIN] mode [MODE] executes',
                            description: 'MicroPython esp8266 attach interrupt'
                        }),
                        blockType: BlockType.CONDITIONAL,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'interruptPins',
                                defaultValue: this.DEFAULT_PWM_AND_INTERRUPT_PIN
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'interruptMode',
                                defaultValue: InterrupMode.Rising
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    pins: { items: this.PINS_MENU },
                    mode: { items: this.MODE_MENU },
                    digitalPins: { items: this.DIGITAL_PINS_MENU },
                    analogPins: { items: this.ANALOG_PINS_MENU },
                    level: { acceptReporters: true, items: this.LEVEL_MENU },
                    pwmPins: { items: this.PWM_AND_INTERRUPT_PINS_MENU },
                    interruptPins: { items: this.PWM_AND_INTERRUPT_PINS_MENU },
                    interruptMode: { items: this.INTERRUP_MODE_MENU }
                }
            },
            {
                id: 'console',
                name: formatMessage({
                    id: 'microPythonEsp8266.category.console',
                    default: 'Console',
                    description: 'The name of the esp8266 microPython device console category'
                }),
                color1: '#FF3399',
                color2: '#CC297A',
                color3: '#CC297A',

                blocks: [
                    {
                        opcode: 'consolePrint',
                        text: formatMessage({
                            id: 'microPythonEsp8266.console.consolePrint',
                            default: 'print [TEXT] [EOL]',
                            description: 'MicrpPython console print'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            TEXT: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello OpenBlock'
                            },
                            EOL: {
                                type: ArgumentType.STRING,
                                menu: 'eol',
                                defaultValue: Eol.Warp
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'consoleInput',
                        text: formatMessage({
                            id: 'microPythonEsp8266.console.consoleInput',
                            default: 'prompt [TEXT] and read input',
                            description: 'MicrpPython console input'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            TEXT: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Input a number:'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    eol: { items: this.EOL_MENU }
                }
            }
        ];
    }
}

export default OpenBlockMicroPythonEsp8266Device;
