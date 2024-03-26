import { die } from 'coa-error'
import { _, axios, Axios } from 'coa-helper'
import { createHash } from 'crypto'
import * as qs from 'querystring'

export interface Kd100ExpressConfig {
    key: string
    customer: string
    secret: string
    userid: string
    endpoint: string
    partnerKey?: string
    partnerSecret?: string
    callBackUrl: string
}

export class Kd100ExpressBin {
    // 基本配置
    readonly config: Kd100ExpressConfig
    // 触发事件过长的阀值
    protected readonly thresholdTooLong = 5 * 1000

    constructor(config: Kd100ExpressConfig) {
        this.config = config
    }

    async simpleRequest(method: Axios.Method, url: string, bizParams: Record<string, any>) {
        //  请求并且记录开始、结束时间
        const startAt = Date.now()
        const res = await axios.request({
            method,
            url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(bizParams),
        })

        const endAt = Date.now()
        // 触发请求事件
        this.onRequest({}, bizParams, res.data)
        // 触发请求时间过长事件
        if (endAt - startAt > this.thresholdTooLong) {
            this.onRequestTooLong(url, {}, res.data, { startAt, endAt })
        }

        return res.data
    }

    // 请求
    async request(url: string, bizParams: Record<string, any>) {
        // 组装参数并请求

        const data = this.buildParams(bizParams)
        //  请求并且记录开始、结束时间
        const startAt = Date.now()
        const res = await axios.request({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        })

        const endAt = Date.now()
        // 触发请求事件
        this.onRequest(data, bizParams, res.data)
        // 触发请求时间过长事件
        if (endAt - startAt > this.thresholdTooLong) {
            this.onRequestTooLong(url, data, res.data, { startAt, endAt })
        }

        // 处理结果
        try {
            return this.handleResult(res, bizParams.signType)
        } catch (e) {
            // 触发请求错误事件
            this.onRequestError(data, res.data, e)
            throw e
        }
    }

    // 构造请求参数
    private buildParams(bizContent: Record<string, any>) {
        const t = _.now()
        let sortData = ''

        if (bizContent.signType === 1) {
            sortData = JSON.stringify(bizContent) + this.config.key + this.config.customer
        } else if (bizContent.signType === 2) {
            sortData = JSON.stringify(bizContent) + t + this.config.key + this.config.secret
        } else {
            die.hint(`快递100系统提示:缺少signType字段`)
        }

        const sign = createHash('MD5').update(sortData, 'utf-8').digest('hex').toUpperCase()

        const res = {
            key: this.config.key,
            customer: this.config.customer,
            sign: sign,
            param: JSON.stringify(bizContent),
            t,
        } as Record<string, any>

        bizContent.method && (res.method = bizContent.method)
        const data = qs.stringify(res)

        return data
    }

    // 结果验签
    private handleResult(res: any, signType: number) {
        const data = res.data || res.request || {}

        // 判断是否正确
        if (data.returnCode && signType === 2) {
            die.hint(`快递100系统提示:[${data.returnCode}] ${data.message}`, 400, data.returnCode)
        }

        if (data.status !== '200' && signType === 1) {
            die.hint(`快递100系统提示:[${data.status}] ${data.message}`, 400, data.status)
        }

        if (data.code !== 200 && signType === 2) {
            die.hint(`快递100系统提示:[${data.code}] ${data.message}`, 400, data.code)
        }
        return data
    }

    // 请求记录
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRequest(param: any, bizContent: any, response: any) {
        // 重写方法
    }

    // 请求失败
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRequestError(param: any, response: any, error: any) {
        // 重写方法
    }

    // 请求时间过长
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRequestTooLong(url: string, param: any, response: any, time: { startAt: number; endAt: number }) {
        // 重写方法
    }
}
