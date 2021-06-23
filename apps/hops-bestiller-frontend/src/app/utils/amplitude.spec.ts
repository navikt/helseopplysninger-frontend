import initAmplitude from "./amplitude";
import amplitude from "amplitude-js";

it('should work', () => {
    initAmplitude()
    const aValue = "dsfas";
    const platform1 = amplitude.getInstance().options.platform + ""
    amplitude.getInstance().options.platform = aValue
    const platform2 = amplitude.getInstance().options.platform + ""
    expect(platform1).toBe("Web")
    expect(platform2).toBe(aValue)
});
