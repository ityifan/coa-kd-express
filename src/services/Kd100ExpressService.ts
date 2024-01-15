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
    async LabelOrder(params: any) {
        return await this.bin.request('https://api.kuaidi100.com/label/order', params)
    }
    /**
     * 电子面单取消
     * @param params
     */

    async Eorderapi(params: any) {
        return await this.bin.request('https://poll.kuaidi100.com/eorderapi.do', params)
    }

    /**
     * 查询接口服务
     * @param params
     */

    async PollQuery(params: Kd100Express.PollQueryReq): Promise<Kd100Express.PollQueryRes> {
        return await this.bin.request('https://poll.kuaidi100.com/poll/query.do', params)
    }
}
