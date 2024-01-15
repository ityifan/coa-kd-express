export declare namespace Kd100Express {

    interface PollQueryReq {
        com: string;
        num: string;
        resultv2: string;
        phone: string;
        signType: number;
        from?: string;
        to?: string;
        show?: string;
        order: string;
    }

    interface PollQueryRes {
        message: string;
        state: string;
        status: string;
        condition: string;
        ischeck: string;
        com: string;
        nu: string;
        data: any;
    }

    interface LabelOrderReq {
        method: string
        signType: number
        payTpe: string
        expType: string
        needSubscribe: string
        pollCallBackUrl: string
        printType: string
        customParam: any
        partnerKey?: string
        partnerId: string
        kuaidicom: string
        recMan: any
        sendMan: any
        cargo: string
        count: string
        tempId: string
        partnerSecret?: string
        code?: string
        partnerName?: string
        net?: string
        checkMan?: string
        tbNet?: string
        weight?: string
        remark?: string
        siid?: string
        direction?: string
        childTempId?: string
        backTempId?: string
        valinsPay?: string
        collection?: string
        needChild?: string
        needBack?: string
        backSign?: string
        orderId?: string
        reorder?: string
        callBackUrl?: string
        salt?: string
        resultv2?: string
        needDesensitization?: string
        needLogo?: string
        thirdOrderId?: string
        oaid?: string
        caid?: string
        thirdTemplateURL?: string
        thirdCustomTemplateUrl?: string
        needOcr?: string
        ocrInclude?: string
        height?: string
        width?: string
    }

    interface LabelOrderRes {
        taskId: string
        kuaidinum: string
        childNum: string
        returnNum: string
        label: string
        bulkpen: string
        orgCode: string
        orgName: string
        destCode: string
        destName: string
        orgSortingCode: string
        orgSortingName: string
        destSortingCode: string
        destSortingName: string
        orgExtra: string
        destExtra: string
        pkgCode: string
        pkgName: string
        road: string
        qrCode: string
        kdComOrderNum: string
        expressCode: string
        expressName: string
    }

    interface EorderapiReq {
        partnerId: string
        kuaidicom: string
        kuaidinum: string
        orderId: string
        partnerKey?: string
        partnerName?: string
        net?: string
        code?: string
        reason?: string
    }
    interface EorderapiRes {
        returnCode: string
        result: boolean
        message: string
    }
}