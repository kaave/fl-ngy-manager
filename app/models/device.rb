class Device < ApplicationRecord
  def self.parse(src)
    # あべ Manaca
    # Type3Tag 'FeliCa Standard (RC-S???)' ID=01010410770FFC02 PMM=100B4B428485D0FF SYS=0003
    # あべ ビッグカメラ
    # Type3Tag 'FeliCa Standard (RC-S962)' ID=0116060000144D0D PMM=0120220427674EFF SYS=816E

    matcher = src.match(/^Type(\d)Tag.+ID=([\dA-F]{16})/)

    if matcher
      {
        type_code: matcher[1].to_i,
        key: matcher[2],
        source: matcher[0]
      }
    end
  end
end
