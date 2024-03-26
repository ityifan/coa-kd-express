import { Kd100ExpressBin, Kd100ExpressConfig } from '../libs/Kd100ExpressBin'
import { Kd100Express } from '../typings'

export class Kd100ExpressService {
    protected bin: Kd100ExpressBin
    protected config: Kd100ExpressConfig

    constructor(bin: Kd100ExpressBin) {
        this.bin = bin
        this.config = this.bin.config
    }

    /**
    * 电子面单下单接口
    * @param params
    */
    async LabelOrder(params: Kd100Express.LabelOrderReq): Promise<Kd100Express.LabelOrderRes> {
        return await this.bin.request('https://api.kuaidi100.com/label/order', params)
    }

    /**
     * 电子面单取消
     * @param params
     */
    async Eorderapi(params: Kd100Express.EorderapiReq): Promise<Kd100Express.EorderapiRes> {
        return await this.bin.request('https://poll.kuaidi100.com/eorderapi.do', params)
    }

    /**
     * 查询接口服务
     * @param params
     */
    async PollQuery(params: Kd100Express.PollQueryReq): Promise<Kd100Express.PollQueryRes> {
        return await this.bin.request('https://poll.kuaidi100.com/poll/query.do', params)
    }

    /**
     * 订阅查询快递接口
     * @company 订阅的快递公司的编码，一律用小写字母
     * @number 订阅的快递单号， 单号的最小长度6个字符，最大长度32个字符
     */
    async Subscribe(company: string, number: string): Promise<{ result: boolean, returnCode: string, message: string }> {
        return await this.bin.simpleRequest('POST', 'https://poll.kuaidi100.com/poll', {
            schema: 'json',
            param: JSON.stringify({
                company,
                number,
                key: this.config.key,
                parameters: {
                    callbackurl: this.config.callBackUrl,
                }
            }),
        })
    }


    async test(param: any) {
        return param
    }
}
