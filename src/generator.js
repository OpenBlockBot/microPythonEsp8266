export default Blockly => {
    Blockly.Python['microPython_pin_setPinMode'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var mode = block.getFieldValue('MODE') || 'IN';

        Blockly.Python.imports_['Pin'] = 'from machine import Pin';
        Blockly.Python.globalsVariables_['pin' + pin] = 'pin' + pin;

        if (mode === 'IN' || mode === 'OUT') {
            return 'pin' + pin + ' = Pin(' + pin + ', Pin.' + mode + ')\n';
        }
        return 'pin' + pin + ' = Pin(' + pin + ', Pin.IN, Pin.' + mode + ')\n';
    };

    Blockly.Python['microPython_pin_menu_level'] = function (block) {
        var code = block.getFieldValue('level') || '0';
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['microPython_pin_setDigitalOutput'] = function (block) {
        var pin = block.getFieldValue('PIN') || '0';
        var level = Blockly.Python.valueToCode(block, 'LEVEL', Blockly.Python.ORDER_FUNCTION_CALL) || '1';
        return 'pin' + pin + '.value(' + level + ')\n';
    };

    Blockly.Python['microPython_pin_setPwmOutput'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var outValue = Blockly.Python.valueToCode(block, 'OUT', Blockly.Python.ORDER_FUNCTION_CALL) || '0';

        Blockly.Python.imports_['Pin'] = 'from machine import Pin';
        Blockly.Python.imports_['PWM'] = 'from machine import PWM';
        Blockly.Python.variables_['PWM' + pin] = 'pwm' + pin + ' = PWM(Pin(' + pin + '), freq = 490)';

        return 'pwm' + pin + '.duty(' + outValue + ')\n';
    };

    Blockly.Python['microPython_pin_readDigitalPin'] = function (block) {
        var pin = block.getFieldValue('PIN');
        return ['pin' + pin + '.value()', Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['microPython_pin_esp8266ReadAnalogPin'] = function (block) {
        var pin = block.getFieldValue('PIN');

        Blockly.Python.imports_['ADC'] = 'from machine import ADC';
        Blockly.Python.variables_['ADC' + pin] = 'adc' + pin + ' = ADC(' + pin.slice(1) + ')';

        return ['adc' + pin + '.read()', Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['microPython_pin_setServoOutput'] = function (block) {
        var pin = block.getFieldValue('PIN') || '0';
        var out = Blockly.Python.valueToCode(block, 'OUT', Blockly.Python.ORDER_FUNCTION_CALL) || '0';

        Blockly.Python.imports_['Pin'] = 'from machine import Pin';
        Blockly.Python.imports_['PWM'] = 'from machine import PWM';
        Blockly.Python.variables_['PWM' + pin] = 'pwm' + pin + ' = PWM(Pin(' + pin + '), freq = 50)';

        Blockly.Python.libraries_['GetServoPulse'] = 'def getServoPulse(angle):\n' +
            '  SERVO_MIN_PULSE_WIDTH = 544\n' +
            '  SERVO_MAX_PULSE_WIDTH = 2400\n\n' +
            '  if(angle > 180):\n' +
            '    angle = 180\n' +
            '  elif(angle < 0):\n' +
            '    angle = 0\n' +
            '  return int((SERVO_MIN_PULSE_WIDTH + (SERVO_MAX_PULSE_WIDTH - SERVO_MIN_PULSE_WIDTH) * angle / 180) / (200 * 100 / 1024))\n';

        return 'pwm' + pin + '.duty(getServoPulse(' + out + '))\n';
    };

    Blockly.Python['microPython_pin_attachInterrupt'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var mode = block.getFieldValue('MODE') || 'RISING';

        var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
        branch = Blockly.Python.addLoopTrap(branch, block.id);

        if (branch) {
            var variablesName = [];
            for (var x in Blockly.Python.variables_) {
                variablesName.push(Blockly.Python.variables_[x].slice(0, Blockly.Python.variables_[x].indexOf('=') - 1));
            }
            if (variablesName.length !== 0) {
                branch = Blockly.Python.INDENT + 'global ' + variablesName.join(', ') + '\n' + branch;
            }
        } else {
            branch = Blockly.Python.INDENT + 'pass\n';
        }

        Blockly.Python.imports_['Pin'] = 'from machine import Pin';
        Blockly.Python.libraries_['ISR' + mode + pin] =
            'def ISR_' + mode + '_' + pin + '(pin):\n' + branch;

        if (mode === 'CHANGE') {
            return 'pin' + pin + '.irq(handler = ISR_' + mode + '_' + pin + ', trigger = (Pin.IRQ_RISING or Pin.IRQ_FALLING))\n';
        }
        return 'pin' + pin + '.irq(handler = ISR_' + mode + '_' + pin + ', trigger = Pin.IRQ_' + mode + ')\n';
    };

    Blockly.Python['microPython_console_consolePrint'] = function (block) {
        var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_UNARY_SIGN) || '';
        var eol = block.getFieldValue('EOL') || 'warp';

        if (eol === 'warp') {
            return 'print(' + msg + ')\n';
        }
        return 'print(' + msg + ", end = '')\n";
    };

    Blockly.Python['microPython_console_consoleInput'] = function (block) {
        var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
        var code = 'input(' + msg + ')';
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    return Blockly;
};
