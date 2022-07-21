export const convertData = (data) => {
    const newData = data.map((item) => {
        return {
            name: item.properties.Name.title.length > 0 ? item.properties.Name.title[0].plain_text : 'Nội thất Sơn La',
            price: item.properties.Gia.number !== null ? item.properties.Gia.number : 0,
            newPrice: item.properties.GiaMoi.formula.number !== null ? item.properties.GiaMoi.formula.number : 0,
            material:
                item.properties.ChatLieu.rich_text.length > 0
                    ? item.properties.ChatLieu.rich_text[0].plain_text
                    : 'Tuỳ chọn',
            sale: item.properties.KhuyenMai.number !== null ? item.properties.KhuyenMai.number : 0,
            insurance:
                item.properties.BaoHanh.rich_text.length > 0
                    ? item.properties.BaoHanh.rich_text[0].plain_text
                    : '12 tháng',
            size:
                item.properties.KichThuoc.rich_text.length > 0
                    ? item.properties.KichThuoc.rich_text.map((item) => item.plain_text).join('')
                    : 'Tuỳ chọn',
            typeCategory: item.properties.LoaiMuc.select !== null ? item.properties.LoaiMuc.select.name : 'Nội thất',
            type: item.properties.Loai.select !== null ? item.properties.Loai.select.name : 'Nội thất',
            color:
                item.properties.MauSac.rich_text.length > 0
                    ? item.properties.MauSac.rich_text[0].plain_text
                    : 'Tuỳ chọn',
            desc:
                item.properties.MoTa.rich_text.length > 0
                    ? item.properties.MoTa.rich_text[0].plain_text
                    : 'Sản phẩm được gia công chất lượng cao từ nội thất Sơn La',
            status: item.properties.TrangThai.multi_select.map((item) => item.name),
            origin:
                item.properties.XuatSu.rich_text.length > 0
                    ? item.properties.XuatSu.rich_text[0].plain_text
                    : 'Việt Nam',
            image:
                item.properties.Anh.files.length > 0
                    ? item.properties.Anh.files.map((item) => item.file.url)
                    : [
                          'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/118199354_750785749052232_4494031233200242155_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=y-LuQBc-SI0AX_B1mgO&_nc_ht=scontent.fhan2-4.fna&oh=00_AT8dPmCkHRaA0UyRgWhFI_1uieVRACFYjnljV2wHnGeWUw&oe=62F14023',
                      ],
        };
    });
    return newData;
};

export const removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    return str;
};
